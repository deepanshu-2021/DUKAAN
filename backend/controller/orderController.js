import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";
import uploadToCloudinary from "../middleware/cloudinary.js";
import Product from "../model/productModel.js";
const addOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (!(orderItems && orderItems.length)) {
    res.status(400);
    throw new Error("no items found!!");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      shippingPrice,
      paymentMethod,
      totalPrice,
      taxPrice,
      itemsPrice,
      user: req.user._id,
    });
    const createdOrder = await Order.create(order);
    res.status(201).json(createdOrder);
  }
});
const getUserOrder = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
const getOrderById = asyncHandler(async (req, res, next) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("order not found!");
  }
});
const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({});
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("orders not found!");
  }
});
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
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
    order.paymentImage = image;
    const orderUpdate = await order.save();
    res.status(200).json(orderUpdate);
  } else {
    res.status(400);
    throw new Error("Order not Found!");
  }
});
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { isDelivered: true }
  );
  if (order) {
    if (order.paymentMethod === "CashOnDelivery") {
      const items = order.orderItems;
      for (const item of items) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { countInStock: -item.qty },
        });
      }
    }
    res.status(204).json("successfully updated!");
  } else {
    res.status(404);
    throw new Error("order not found!!");
  }
});
const updateOrderToVerified = asyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { isVerified: true }
  );
  if (order) {
    const items = order.orderItems;
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { countInStock: -item.qty },
      });
    }
    res.status(204).json("successfully updated!");
  } else {
    res.status(404);
    throw new Error("order not found!!");
  }
});
export {
  addOrder,
  getOrderById,
  getUserOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToVerified,
  getOrders,
};
