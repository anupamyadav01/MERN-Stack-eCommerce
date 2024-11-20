import express from "express";
import { addReview } from "../controller/reviewController.js";

export const ReviewRouter = express.Router();

ReviewRouter.post("/review/:productId", addReview);
