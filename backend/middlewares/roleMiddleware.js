import { UserModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const roleMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    // Validate JWT token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // cheking for user authorization
    const userDataFromDB = await UserModel.findOne({ email: user.email });
    console.log(userDataFromDB);

    if (userDataFromDB.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    req.user = userDataFromDB;
    next();
  } catch (error) {
    console.log("Error from roleMiddleware: ", error);
    res.status(500).json({ message: "Error in roleMiddleware" });
  }
};
