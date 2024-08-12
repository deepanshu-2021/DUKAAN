import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Corrected to use string for model reference
    },
    name: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    rating: {
      type: Number, // Corrected `Type` to `type`
      required: true,
    },
    comment: {
      type: String, // Corrected `Comment` to `comment` and `Number` to `String`
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Corrected to use string for model reference
    },
    name: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    image: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    category: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    description: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    brand: {
      type: String, // Corrected `Type` to `type`
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema], // Corrected `review` to `reviews` for clarity
    numReviews: {
      type: Number, // Corrected `numReviw` to `numReviews`
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0, // Changed default from `false` to `0`
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema); // Corrected model name to be capitalized and used `productSchema` instead of `productschema`
export default Product;
