import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoute.js";
import productRouter from "./routes/productRouter.js";

const app = express();
app.use("/api/seed", seedRouter);
dotenv.config();
//connect to data base
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Success to connect DB");
  })
  .catch((err) => console.log(err.message));
//Routes
app.use("/api/products", productRouter);
//start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server at http://localhost/${port}`);
});
