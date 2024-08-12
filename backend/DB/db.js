import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};
export { connectDB };
