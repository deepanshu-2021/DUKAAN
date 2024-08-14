import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/db.js";
import productRouter from "./Routes/productRoutes.js";
import { erorrHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import { orderRouter } from "./Routes/orderRoute.js";
import cors from "cors";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://dukaan-red.vercel.app/",
  })
);
//cookie parser
app.use(cookieParser());
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
connectDB();
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);
app.get("*", (req, res) => {
  res.send("hi mom");
});
app.use(notFound);
app.use(erorrHandler);
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
