const mongoose = require("mongoose");
const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");
const Category = require("./models/category.model");
const Cart = require("./models/cart.model");
const User = require("./models/user.model");
const Wishlist = require("./models/wishlist.model");
const Address = require("./models/address.model");
const Order = require("./models/order.model");

const app = express();
initializeDatabase();

app.use(express.json());

async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
}

// Endpoint to fetch all products from the database.
app.get("/api/products", async (req, res) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

async function getProductById(productId) {
  try {
    return await Product.findById(productId);
  } catch (error) {
    throw error;
  }
}

// Endpoint to retrieve a product by productId from the database.
app.get("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await getProductById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: { product } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching product by ID",
      error: error.message,
    });
  }
});

async function getAllCategories() {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
}

// Endpoint to fetch all categories from the database.
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json({
      success: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching categories.",
      error: error.message,
    });
  }
});

async function getCategoryById(categoryId) {
  try {
    return await Category.findById(categoryId);
  } catch (error) {
    throw error;
  }
}

// Endpoint to retrieve a category by categoryId from the database.
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: true, message: "Category not found" });
    }

    return res.status(200).json({ success: true, data: { category } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching category by ID",
      error: error.message,
    });
  }
});

async function getCart(userId) {
  try {
    return await Cart.findOne({ userId }).populate(
      "items.productId",
      "title price imageUrl"
    );
  } catch (error) {
    throw error;
  }
}

// Endpoint to retrieve cart items from the database
app.get("/api/cart", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cart = await getCart(userId);

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty",
        cart: { items: [] },
      });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cart items",
      error: error.message,
    });
  }
});

async function addToCart(userId, productId, size, quantity) {
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            size,
            quantity,
          },
        ],
      });

      return cart;
    }

    // Check for duplicate product + size
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (index > -1) {
      // product already exists with same size
      cart.items[index].quantity += quantity;
    } else {
      // new product or different size
      cart.items.push({
        productId,
        size,
        quantity,
      });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

// Endpoint to add product to the cart
app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId, size, quantity = 1 } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      console.log(user);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Add to cart
    const updatedCart = await addToCart(userId, productId, size, quantity);

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in add to cart",
      error: error.message,
    });
  }
});

async function updateQuantity(userId, productId, quantity, size) {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (index === -1) {
      throw new Error("Item not found");
    }

    cart.items[index].quantity = quantity;

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

// Endpoint to update the quantity of the product in the cart
app.post("/api/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, quantity, size } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedCart = await updateQuantity(userId, productId, quantity, size);

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating quantity",
      error: error.message,
    });
  }
});

async function removeItem(userId, productId, size) {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (index === -1) {
      throw new Error("Item not present in the cart");
    }

    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() == productId && item.size == size)
    );

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

// Endpoint to remove the product from the cart
app.delete("/api/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, size } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await removeItem(userId, productId, size);

    return res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
});

async function getWishlist(userId) {
  try {
    return await Wishlist.findOne({ user: userId }).populate(
      "items.product",
      "title price sizes imageUrl"
    );
  } catch (error) {
    throw error;
  }
}

// Endpoint to retrieve wishlisted items from the database
app.get("/api/wishlist", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const wishlist = await getWishlist(userId);

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        message: "Your wishlist is empty",
        wishlist: { items: [] },
      });
    }

    return res.status(200).json({ success: true, wishlist });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching wishlist",
      error: error.message,
    });
  }
});

async function addToWishlist(userId, productId) {
  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [
          {
            product: productId,
          },
        ],
      });

      return wishlist;
    }

    const exists = wishlist.items.some(
      (item) => item.product.toString() === productId
    );

    if (exists) {
      throw new Error("Product already in wishlist");
    }

    wishlist.items.push({ product: productId });

    await wishlist.save();
    return wishlist;
  } catch (error) {
    throw error;
  }
}

// Endpoint to add item to wishlist
app.post("/api/wishlist", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Add to wishlilst
    const updatedWishlist = await addToWishlist(userId, productId);

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in add item to wishlist",
      error: error.message,
    });
  }
});

async function removeItemFromWishlist(userId, productId) {
  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const existing = wishlist.items.some(
      (item) => item.product.toString() === productId
    );

    if (!existing) {
      throw new Error("Item not found in wishlist");
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    return wishlist;
  } catch (error) {
    throw error;
  }
}

// Endpoint to remove item from the wishlist
app.delete("/api/wishlist/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedWishlist = await removeItemFromWishlist(userId, productId);

    return res.status(200).json({
      success: true,
      message: "Item removed successfully from wishlist",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in removing item from the wishlist",
      error: error.message,
    });
  }
});

async function clearWishlist(userId) {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );

    return wishlist;
  } catch (error) {
    throw error;
  }
}

// Endpoint to clear wishlist
app.delete("/api/wishlist", async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const wishlist = await clearWishlist(userId);

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in clear wishlist",
      error: error.message,
    });
  }
});

async function getAddresses(userId) {
  try {
    return await Address.find({ user: userId });
  } catch (error) {
    throw error;
  }
}

// Endpoint to fetching addresses from database
app.get("/api/addresses", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format and user ID is required",
      });
    }

    const addresses = await getAddresses(userId);

    if (addresses.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No address found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        addresses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching addresses",
      error: error.message,
    });
  }
});

async function createAddress(userId, data) {
  try {
    // If this is the first address → mark as default
    const existing = await Address.find({ user: userId });

    const newAddress = await Address.create({
      ...data,
      user: userId,
      isDefault: existing.length === 0,
    });

    return newAddress;
  } catch (error) {
    throw error;
  }
}

// Endpoint to add address to the database
app.post("/api/addresses", async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      pincode,
      state,
      city,
      addressLine,
      landmark,
      addressType,
      isDefault,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    if (
      !userId ||
      !name ||
      !phone ||
      !pincode ||
      !state ||
      !city ||
      !addressLine
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, name, phone, pincode, state, city and addressLine is required",
      });
    }

    const address = await createAddress(userId, {
      name,
      phone,
      pincode,
      state,
      city,
      addressLine,
      landmark,
      addressType,
      isDefault,
    });

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: {
        address,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in adding addresse",
      error: error.message,
    });
  }
});

async function updateAddress(userId, addressId, data) {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      data,
      { new: true }
    );

    return address;
  } catch (error) {
    throw error;
  }
}

// Endpoint to update an address
app.post("/api/addresses/:addressId", async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      pincode,
      state,
      city,
      addressLine,
      landmark,
      addressType,
    } = req.body;
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format or user ID is missing",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID format or address ID is missing",
      });
    }

    const updatedAddress = await updateAddress(userId, addressId, {
      name,
      phone,
      pincode,
      state,
      city,
      addressLine,
      landmark,
      addressType,
    });

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: { address: updatedAddress },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating address",
      error: error.message,
    });
  }
});

async function deleteAddress(userId, addressId) {
  try {
    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    return deleted;
  } catch (error) {
    throw error;
  }
}

// Endpoint to remove address from the database
app.delete("/api/addresses/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format or user ID is missing",
      });
    }

    const deleted = await deleteAddress(userId, addressId);

    console.log(deleted);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: true, message: "Address not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in removing address",
      error: error.message,
    });
  }
});

async function getOrders(userId) {
  try {
    return await Order.find({ user: userId })
      .populate("items.product", "name price imageUrl")
      .populate("shippingAddress");
  } catch (error) {
    throw error;
  }
}

// Endpoint to get all orders of a user
app.get("/api/orders", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing or Invalid user ID format",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orders = await getOrders(userId);

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        data: {
          orders: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: {
        orders,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching orders",
      error: error.message,
    });
  }
});

async function placeOrder(userId, addressId, paymentMethod, paymentStatus) {
  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "title price"
    );

    if (!cart || cart.items.length === 0) {
      throw new Error("Your cart is empty");
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.productId._id,
      price: item.productId.price,
      quantity: item.quantity,
      size: item.size,
    }));

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum, currItem) => sum + currItem.price * currItem.quantity,
      0
    );

    // Create order document
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress: addressId,
      paymentMethod,
      paymentStatus,
    });

    // Empty the cart after order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    return order;
  } catch (error) {
    throw error;
  }
}

// Endpoint to place order for cart items
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, addressId, paymentMethod, paymentStatus } = req.body;

    // Validate Mongo IDs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid addressId",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate address
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found or does not belong to this user",
      });
    }

    // Place order
    const order = await placeOrder(
      userId,
      addressId,
      paymentMethod,
      paymentStatus
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
});

async function placeBuyNowOrder(
  userId,
  productId,
  quantity,
  size,
  addressId,
  paymentMethod
) {
  try {
    const product = await Product.findById(productId);

    const orderItem = {
      product: productId,
      price: product.price, // price at order time
      quantity,
      size,
    };

    const totalAmount = product.price * quantity;

    const order = await Order.create({
      user: userId,
      items: [orderItem],
      totalAmount,
      shippingAddress: addressId,
      paymentMethod,
    });

    return order;
  } catch (error) {
    throw error;
  }
}

// Endpoint: Direct order API
app.post("/api/orders/buy-now", async (req, res) => {
  try {
    const { userId, productId, quantity, size, addressId, paymentMethod } =
      req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    // Validate size
    if (product.sizes && !product.sizes.includes(size)) {
      return res.status(400).json({
        success: false,
        message: "Invalid size selection",
      });
    }

    // Validate address
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid addressId",
      });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Validate payment method
    if (!["cod", "online"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const order = await placeBuyNowOrder(
      userId,
      productId,
      quantity,
      size,
      addressId,
      paymentMethod
    );

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Error in placing order",
    });
  }
});

async function getOrderById(userId, orderId) {
  try {
    return await Order.findOne({ _id: orderId, user: userId });
  } catch (error) {
    throw error;
  }
}

// Endpoint to get a specific order
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;

    // Validate mongo IDs
    if (
      !mongoose.Types.ObjectId.isValid(orderId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or orderId",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const order = await getOrderById(userId, orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Error in fetching order by orderId",
    });
  }
});

app.get("/", (req, res) =>
  res.send({ status: "ok", message: "Ecommerce backend running." })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
