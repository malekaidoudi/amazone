import jwt from "jsonwebtoken";

export const generateToken = (obj) => {
  const user = obj.toJSON();
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 604800, // one week
  });
};
