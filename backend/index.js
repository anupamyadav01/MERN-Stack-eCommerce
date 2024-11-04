import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import { CartRouter } from "./routes/cartRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 9000;

// Determine the client URL based on the environment
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://full-stack-ecommerce-rosy.vercel.app"
    : "http://localhost:5173";

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Handle OPTIONS requests for CORS preflight
app.options("*", cors({ origin: CLIENT_URL, credentials: true }));

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Universal Error Handler
app.use((error, req, res, next) => {
  console.log("Error from universal error handler", error);
  res.status(500).send({ message: "Something went wrong" });
});
