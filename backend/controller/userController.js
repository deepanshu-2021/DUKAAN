import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import { genreateToken } from "../util/genrateToken.js";
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    genreateToken(res, user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("inavlid emai or password!!");
  }
});
const userReg = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.create({ email, password, name });
    genreateToken(res, user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("inavlid emai or password!!");
  }
});
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logget out successfully" });
});
const UserDeleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw Error("unable to get users");
  }
});
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    throw Error("unable to get users");
  }
});
const deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  if (user) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "User deleted succesfully!!" });
  } else {
    res.status(400);
    res.json({ message: "user not found!!" });
  }
});
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("inavlid emai or password!!");
  }
});
const updateProfile = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  let user = await User.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user = await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("inavlid details");
  }
});
const userById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("user not found!!");
  }
});
const changeToAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(400);
    throw Error("user not found!");
  }
});
export {
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
};
