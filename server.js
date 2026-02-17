const express = require("express");
const morgan = require("morgan");
const products = require("./data/products");
const app = express(); //create server

app.use(morgan("dev"));
app.use(express.json()); // parsea json a objeto

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

app.put("/products", (req, res) => {
  res.send("update products");
});

app.delete("/products", (req, res) => {
  res.send("delete products");
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

app.listen(3000);
console.log(`server on port ${3000}`);
