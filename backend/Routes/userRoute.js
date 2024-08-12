import express from "express";
import {
  updateProfile,
  userAuth,
  userById,
  userLogout,
  userReg,
  getProfile,
  deleteProfile,
  allUsers,
  UserDeleteById,
  changeToAdmin,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const userRouter = express.Router();
userRouter.route("/").post(userReg).get(allUsers);
userRouter.delete("/logout", userLogout);
userRouter.post("/login", userAuth);
userRouter
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);
userRouter
  .route("/:id", protect, admin)
  .delete(UserDeleteById)
  .get(userById)
  .put(changeToAdmin);
userRouter.delete("/profile/delete", protect, deleteProfile);
export default userRouter;
