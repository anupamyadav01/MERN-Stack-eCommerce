import { UserModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // const isSame = await UserModel.findOne({})
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "No token provided",
      });
    }

    // checking tokens validation using secret key
    const isValid = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.json({
          sucess: false,
          message: "Invalid token",
        });
      }
    });

    // decoding jwt token and getting user data
    const tokenData = jwt.decode(token);

    // checking if user exists or not
    const user = await UserModel.findOne({
      email: tokenData.email,
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Invalid token",
      });
    }

    // passing jwt user data to next api / middleware
    req.user = tokenData;

    next();
  } catch (error) {
    console.log("error from authMiddleware-> ", error);
    res.send({
      message: "error",
    });
  }
};

export default authMiddleware;
