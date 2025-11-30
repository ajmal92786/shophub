const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"],
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    availableQuantity: { type: Number, default: 0 },
    descriptionPoints: [{ type: String }],
    returnPolicy: {
      returnable: {
        type: Boolean,
        default: true,
      },
      returnDays: {
        type: Number,
        default: 10,
      },
    },
    payOnDelivery: { type: Boolean, default: true },
    freeDelivery: { type: Boolean, default: true },
    securePayment: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
