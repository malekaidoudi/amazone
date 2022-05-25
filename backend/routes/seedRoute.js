import express from "express";
import data from "../data.js";
import Product from "../Models/productModel.js";
import Users from "../Models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  await Users.remove({});
  const createdUsers = await Users.insertMany(data.users);
  res.send({ createdProduct, createdUsers });
});

export default seedRouter;
