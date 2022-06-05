import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
export const generateToken = (obj) => {
  const user = obj.toJSON();
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 604800, // one week
  });
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
      }
      next();
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
