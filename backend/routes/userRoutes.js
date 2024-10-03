import express from "express";
import {
  checkLoggedIn,
  forgotPassword,
  getUsers,
  login,
  logout,
  register,
  resetPassword,
  verifyOTP,
} from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";
import getUserDetails from "../middlewares/getUserDetailsM.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.get("/users", authMiddleware, getUsers);

userRouter.post(
  "/isLoggedIn",
  getUserDetails,
  roleCheckMiddleware,
  checkLoggedIn
);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/verify-otp", verifyOTP);

userRouter.post("/reset-password", resetPassword);

export default userRouter;
