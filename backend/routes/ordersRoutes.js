import express from "express";
import Order from "../Models/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.cartItems.map((el) => ({ ...el, product: el._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice,
      shippingPrice: req.body.shippingPrice,
      calculateTax: req.body.calculateTax,
      totalOrder: req.body.totalOrder,
      user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "Order successfully created", order });
  })
);
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      console.log("resultat:" + order);
      res.send(order);
    } else {
      res.status(401).send({ message: "This order inexistant" });
    }
  })
);

export default orderRouter;
