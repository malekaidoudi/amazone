import express from "express";
import data from "../data.js";
import Product from "../Models/productModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  res.send({ createdProduct });
});
export default seedRouter;
