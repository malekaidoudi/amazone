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
// usersRouter.post("/signup", async (req, res) => {
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password),
//   });
//   const user = await newUser.save();
//   res.send({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     isAdmin: user.isAdmin,
//     token: generateToken(user),
//   });
// });

export default orderRouter;
