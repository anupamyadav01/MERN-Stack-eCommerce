import express from "express";
import {
  addProduct,
  checkRole,
  showProducts,
} from "../controller/productController.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post("/add-product", roleMiddleware, addProduct);

ProductRouter.get("/products", showProducts);
ProductRouter.post("/check-role", roleMiddleware, checkRole);

export default ProductRouter;
