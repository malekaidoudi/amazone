import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/users", usersRouter);
app.use("/api/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//start server

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server at http://localhost/${port}`);
});
