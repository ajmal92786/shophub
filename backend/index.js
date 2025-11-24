const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");
const Category = require("./models/Category.model");

const app = express();
initializeDatabase();

async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

// Endpoint to fetch all products from the database.
app.get("/api/products", async (req, res) => {
  try {
    const products = await getAllProducts();

    if (products && products.length > 0) {
      return res.status(200).json({
        success: true,
        data: {
          products,
        },
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching products",
      error: error.message,
    });
  }
});

async function getProductById(productId) {
  try {
    return await Product.findById(productId);
  } catch (error) {
    throw new Error("Error fetching product by id: " + error.message);
  }
}

// Endpoint to retrieve a product by productId from the database.
app.get("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await getProductById(productId);

    if (product) {
      return res.status(200).json({ success: true, data: { product } });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching product by id",
      error: error.message,
    });
  }
});

async function getAllCategories() {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error("Error in fetching categories: " + error.message);
  }
}

// Endpoint to fetch all categories from the database.
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    if (categories) {
      return res.status(200).json({ success: true, data: { categories } });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No categories found." });
    }
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
    throw new Error(
      "Error in fetching a category by categoryId: " + error.message
    );
  }
}

// Endpoint to retrieve a category by categoryId from the database.
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Category Id is required." });
    }

    const category = await getCategoryById(categoryId);

    if (category) {
      return res.status(200).json({ success: true, data: { category } });
    } else {
      return res
        .status(404)
        .json({ success: true, message: "Category not found." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching category by id",
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
