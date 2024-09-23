import { UserModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateOTP from "../services/generateOTP.js";
import sendMail from "../services/sendMail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please enter all fields" });
    }
    // checking if user already exists
    const response = await UserModel.findOne({ email });
    if (response) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newlyCreatedUser = await UserModel.create(userData);
    console.log(newlyCreatedUser);
    res
      .status(201)
      .json({ sucess: true, message: "User created successfully" });
  } catch (error) {
    console.log("Failed to register user:", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please enter all fields" });
    }
    // checking if user exists or not
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ sucess: false, message: "User not found" });
    }

    // checking if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid credentials" });
    }

    // if password is correct, create JWT token

    const jwtPayload = {
      name: existingUser.name,
      email: existingUser.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // store token in cookie
    await UserModel.findByIdAndUpdate(existingUser._id, {
      $set: { token },
    });
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ sucess: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = req.user;
    const dbData = await UserModel.findOne({
      email: user.email,
    });
    return res.status(200).send({
      sucess: true,
      user: dbData,
    });
  } catch (error) {
    return res.status(500).send({
      sucess: false,
      message: "Something went wrong, please try again later.",
    });
  }
};

export const checkLoggedIn = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      sucess: true,
      user: user,
    });
  } catch (error) {}
  res.send({ sucess: true, message: "checking user logged in" });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    // TODO = check in DB if email exists or not
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const otpExpiryTime = 10; // 10 minutes expiry time
    const otp = generateOTP(); // Assuming generateOTP function returns an OTP code

    // Construct email body as an HTML string
    const actualBody = `
      <html>
        <head>
          <title>Password Reset OTP</title>
          <style>/* Your CSS styles here */</style>
        </head>
        <body>
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2>Password Reset OTP</h2>
            <p>Dear ${email},</p>
            <p>
              You recently requested to reset your password. Your OTP code is: <strong>${otp}</strong>
            </p>
            <p>This OTP will expire in ${otpExpiryTime} minutes.</p>
            <p>
              <a href="{{ reset_password_url }}">Reset Password</a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email
    const mailResponse = sendMail(email, "Reset Password", actualBody);
    if (mailResponse) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { $set: { otp } },
        { new: true }
      );
      console.log("updatedUser:", updatedUser);
    }
    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", mailResponse });
  } catch (error) {
    console.error("Error from reset password:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error, failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    console.log("OTP verified successfully");
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const checkUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (checkUser) {
      res.status(201).send({
        sucess: true,
        message: "Password Updated Sucessfully.",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      message: "errror in reset",
    });
  }
};
