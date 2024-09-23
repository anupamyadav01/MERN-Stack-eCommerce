import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./services/connectToMongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dotenv.config();

connectToMongoDB();

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
