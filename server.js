const express = require("express");
const morgan = require("morgan");
const products = require("./data/products");
const app = express(); //create server

app.use(morgan("dev"));
app.use(express.json()); // parsea json a objeto

app.get("/products", (req, res) => {
  res.json(products);
});

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

app.get("/products/:id", (req, res) => {
  res.send("getting a product");
});

app.listen(3000);
console.log(`server on port ${3000}`);
