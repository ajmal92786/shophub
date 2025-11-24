const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1, min: 1 },
  size: { type: String },
  addedAt: { type: Date, default: Date.now },
});

// Ensures a user cannot add the same product to the cart more than once.
CartItemSchema.index({ user: 1, product: 1 }, { unique: true });

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
