import express from "express";
import {
  getProduct,
  allProducts,
  deleteProduct,
  createProduct,
  editProduct,
  addReview,
  topProducts,
} from "../controller/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
const productRouter = express.Router();
productRouter.route("/").get(allProducts).post(protect, admin, createProduct);
productRouter.route("/top").get(topProducts);
productRouter
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, upload.single("image"), editProduct);
productRouter.route("/review/:id").put(protect, addReview);
export default productRouter;
