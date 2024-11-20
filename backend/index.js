import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import { CartRouter } from "./routes/cartRoutes.js";
import { ReviewRouter } from "./routes/reviewRoutes.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: [
      "https://full-stack-ecommerce-rosy.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/review", ReviewRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Universal Error Handler
app.use((error, req, res, next) => {
  console.log("Error from universal error handler", error);
  res.status(500).send({ message: "Something went wrong" });
});
