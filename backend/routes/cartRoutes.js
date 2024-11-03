import express from "express";
import getUserDetails from "../middlewares/getUserDetailsM.js";
import {
  getAllCartItems,
  removeItem,
  resetCart,
} from "../controller/cartController.js";
export const CartRouter = express.Router();

CartRouter.get("/getAllCartItems", getUserDetails, getAllCartItems);
CartRouter.post("/removeItem", getUserDetails, removeItem);
CartRouter.post("/resetCart", getUserDetails, resetCart);
