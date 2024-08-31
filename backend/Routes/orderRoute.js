import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrder,
  getOrderById,
  getUserOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
  updateOrderToVerified,
  deleteOrder,
} from "../controller/orderController.js";
import { upload } from "../middleware/multerMiddleware.js";
const orderRouter = express.Router();
orderRouter.route("/").get(protect, admin, getOrders);
orderRouter.route("/mine").get(protect, getUserOrder).post(protect, addOrder);
orderRouter.route("/:id").get(protect, getOrderById).delete(deleteOrder);
orderRouter
  .route("/:id/paid")
  .put(protect, upload.single("image"), updateOrderToPaid);
orderRouter.route("/:id/verify").put(updateOrderToVerified);
orderRouter.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);
export { orderRouter };
