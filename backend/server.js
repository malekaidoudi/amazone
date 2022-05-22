import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();
//connect to data base
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Success to connect DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
//Routes
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((el) => el.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res
      .status(404)
      .send({ message: "Request failed code 404: Product Not Found" });
  }
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((el) => el._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res
      .status(404)
      .send({ message: "Request failed code 404: Product Not Found" });
  }
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server at http://localhost/${port}`);
});
