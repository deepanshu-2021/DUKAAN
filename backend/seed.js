import dotenv from "dotenv";
import Order from "./model/orderModel.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import products from "./data/products.js";
import users from "./data/users.js";
import mongoose from "mongoose";
import { connectDB } from "./DB/db.js";
dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Order.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log("Data Destroyed!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
