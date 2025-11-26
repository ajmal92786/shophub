const mongoose = require("mongoose");
const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");
const Category = require("./models/category.model");
const Cart = require("./models/cart.model");
const User = require("./models/user.model");

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
        success: false,
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

app.get("/", (req, res) =>
  res.send({ status: "ok", message: "Ecommerce backend running." })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
