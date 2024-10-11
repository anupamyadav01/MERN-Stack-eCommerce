import express from "express";
import { addProductToCart } from "../controller/cartController.js";
import getUserDetails from "../middlewares/getUserDetailsM.js";
export const CartRouter = express.Router();

CartRouter.post("/add-to-cart", getUserDetails, addProductToCart);
