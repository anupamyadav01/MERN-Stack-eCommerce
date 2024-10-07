import express from "express";
import {
  addProduct,
  addToWishlist,
  rating,
  showProducts,
} from "../controller/productController.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";
import { uploadProductImage } from "../services/multerConfig.js";
import { uploadToCloudniary } from "../services/cloudniaryUpload.js";
import getUserDetails from "../middlewares/getUserDetailsM.js";
import {
  addReview,
  getReviewsByProductId,
} from "../controller/reviewController.js";
import { validateReview } from "../middlewares/validateReviewMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post(
  "/create-product",
  getUserDetails,
  roleCheckMiddleware,
  uploadProductImage.single("productImage"),
  uploadToCloudniary,
  addProduct
);

ProductRouter.get("/get-products", showProducts);

ProductRouter.post("/review/:productId", validateReview, addReview);

ProductRouter.get("/review/:productId", getReviewsByProductId);

ProductRouter.post("/addToWishlist/:productId", getUserDetails, addToWishlist);

ProductRouter.post("/rating/:productId", getUserDetails, rating);

export default ProductRouter;
