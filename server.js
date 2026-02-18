const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT;
let products = require("./data/products");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
  res.json(products);
});

// CREATE NEW PRODUCT
app.post("/products", (req, res) => {
  console.log("request body:", req.body);
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

// UPDATE A PRODUCT
app.put("/products/:id", (req, res) => {
  const newData = req.body; // {price:,name:}
  const id = Number(req.params.id);
  const productFound = products.find((item) => item.id === id);
  if (!productFound) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = products.map((p) => (p.id === id ? { ...p, ...newData } : p));

  res.json({
    message: "Product updated succesfully",
  });
});

// DELETE A PRODUCT
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productFound = products.find((item) => item.id === id);
  if (!productFound) {
    return res.status(404).json({ message: "Product not found" });
  }
  products = products.filter((p) => p.id !== id);
  res.sendStatus(200);
});

// GET ONE PRODUCT
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productFound = products.find((item) => item.id === id);
  if (!productFound) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(productFound);
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
