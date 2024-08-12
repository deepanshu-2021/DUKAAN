import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Corrected 'Type' to 'type'
      required: true,
      ref: "user",
    },
    orderItems: [
      {
        name: { type: String, required: true }, // Corrected 'Type' to 'type'
        qty: { type: Number, required: true }, // Corrected 'Type' to 'type', changed to Number for quantity
        image: { type: String, required: true }, // Corrected 'Type' to 'type'
        price: { type: Number, required: true }, // Corrected 'Type' to 'type', changed to Number for price
        product: {
          // Corrected 'prodduct' to 'product'
          type: mongoose.Schema.Types.ObjectId, // Corrected 'Type' to 'type'
          required: true, // Corrected 'requied' to 'required'
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      // Corrected 'shippingAdress' to 'shippingAddress'
      address: { type: String, required: true }, // Corrected 'Type' to 'type'
      city: { type: String, required: true }, // Corrected 'Type' to 'type'
      state: { type: String, required: true },
      pinCode: { type: Number, required: true }, // Corrected 'Type' to 'type'
    },
    paymentMethod: {
      type: String,
    },
    paymentImage: {
      type: String,
    },
    itemsPrice: {
      type: Number,
      required: true, // Corrected 'requied' to 'required'
      default: 0.0,
    },
    taxPrice: {
      // Corrected 'taxPice' to 'taxPrice'
      type: Number,
      required: true, // Corrected 'requied' to 'required'
      default: 0.0,
    },
    shippingPrice: {
      // Corrected 'shippingPice' to 'shippingPrice'
      type: Number, // Corrected 'Type' to 'type'
      required: true, // Corrected 'requied' to 'required'
      default: 0.0,
    },
    totalPrice: {
      // Corrected 'totalPice' to 'totalPrice'
      type: Number,
      required: true, // Corrected 'requied' to 'required'
      default: 0.0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      required: true, // Corrected 'requied' to 'required'
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true, // Corrected 'requied' to 'required'
      default: false,
    },
    deliveredAt: {
      // Corrected 'DeliveredAt' to 'deliveredAt'
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema); // Capitalized model name for convention
export default Order;
