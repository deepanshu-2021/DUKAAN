import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import asyncHandler from "./asyncHandler.js";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (filePath) => {
  if (!filePath) {
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (err) {
    console.log(err);
    fs.unlinkSync(filePath);
    return null;
  }
};
export default uploadToCloudinary;
