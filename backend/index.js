const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");

const app = express();
initializeDatabase();

app.get("/", (req, res) =>
  res.send({ status: "ok", message: "Ecommerce backend running" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
