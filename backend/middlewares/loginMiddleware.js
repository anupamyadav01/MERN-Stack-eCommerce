import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";

const loginMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.cookie?.split("=")[1];
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "No token provided",
      });
    }
    const loggedUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({ email: loggedUser.email });
    req.user = user;

    next();
  } catch (error) {
    console.log("errror from islogged in", error);
  }
};

export default loginMiddleware;
