import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import ProductRouter from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
dotenv.config();

connectToMongoDB();

app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
