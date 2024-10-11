import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import ProductRouter from "./routes/productRoutes.js";
import { CartRouter } from "./routes/cartRoutes.js";

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dotenv.config();
connectToMongoDB();

app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Universal Error Handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({ message: "Something went wrong" });
});
