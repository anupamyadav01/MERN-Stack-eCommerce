import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import { CartRouter } from "./routes/cartRoutes.js";

const app = express();
const PORT = process.env.PORT || 9000;

dotenv.config(); // Load environment variables

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-ecommerce-rosy.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

app.use(cors(corsOptions));

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
