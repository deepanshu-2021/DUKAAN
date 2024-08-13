import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/db.js";
import productRouter from "./Routes/productRoutes.js";
import { erorrHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import { orderRouter } from "./Routes/orderRoute.js";
import path from "path";
const app = express();
dotenv.config();
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
const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname + "/frontend/build")));
  //any route that is not presetn will go to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("hi mom");
  });
}
app.use(notFound);
app.use(erorrHandler);
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
