import jwt from "jsonwebtoken";
import ENV from "../config.js";


export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers("authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, ENV.JWT_SECRET);
    req.user = verified;
    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

