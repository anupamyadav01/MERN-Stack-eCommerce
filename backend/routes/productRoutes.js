import express from "express";
import { addProduct, showProducts } from "../controller/productController.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post("/create-product", roleCheckMiddleware, addProduct);

ProductRouter.get("/get-products", showProducts);

export default ProductRouter;
