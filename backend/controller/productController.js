import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";
import uploadToCloudinary from "../middleware/cloudinary.js";
const topProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(201).json(products);
});
const allProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 4;
  const page = req.query.pageNumber || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  if (products) {
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(400);
    throw Error("products not found");
  }
});
const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw Error("product not found");
  }
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    res.status(204).json("successfully deleted!");
  } else {
    res.status(400);
    throw Error("product not found!!");
  }
});
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "sample",
    user: req.user.id,
    image: "smaple",
    description: "sample description",
    numReviews: 0,
    countInStock: 0,
    brand: "sample",
    category: "sample",
    price: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createProduct);
});
const addReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("product not found!");
  }
  const alreadReviews = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadReviews) {
    res.status(400);
    throw new Error("Review already exists!");
  }
  const Review = {
    comment,
    rating,
    name: req.user.name,
    user: req.user,
  };
  product.reviews.push(Review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;
  const updateProduct = await product.save();
  res.status(201).json("succesfully reviw created!");
});
const editProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, description, countInStock, brand, category, price } = req.body;
  let image;
  if (req.file && req.file.path) {
    try {
      image = await uploadToCloudinary(req.file.path);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to upload image", error: err.message });
    }
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.countInStock = countInStock || product.countInStock;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.price = price || product.price;
  if (image) {
    product.image = image;
  }

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

export {
  getProduct,
  allProducts,
  deleteProduct,
  createProduct,
  editProduct,
  addReview,
  topProducts,
};
