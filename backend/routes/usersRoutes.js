import express from "express";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password))
        res.send({
          _id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      res.status(401).send({ message: "Invalid password" });
    }
    res.status(401).send({ message: "Invalid email" });
  })
);
// usersRouter.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res
//       .status(404)
//       .send({ message: "Request failed code 404: Product Not Found" });
//   }
// });
export default usersRouter;
