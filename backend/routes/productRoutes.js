import express from "express";
import { addProduct, showProducts } from "../controller/productController.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";
import { uploadProductImage } from "../services/multerConfig.js";
import { uploadToCloudniary } from "../services/cloudniaryUpload.js";
import getUserDetails from "../middlewares/getUserDetailsM.js";

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

export default ProductRouter;
