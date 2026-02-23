import jwt from "jsonwebtoken";
// import { User } from "../models/User.model";

import { User } from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("_id email name");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user_from_cookies = user; // 🔥 attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user data in request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" ,errorCode:"LOGIN_TO_PROCEED",showMessage:"nonw"});
  }
};
