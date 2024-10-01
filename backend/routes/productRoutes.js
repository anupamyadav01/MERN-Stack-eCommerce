import express from "express";
import { addProduct, showProducts } from "../controller/productController.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post("/add-product", roleCheckMiddleware, addProduct);

ProductRouter.get("/products", showProducts);

export default ProductRouter;
