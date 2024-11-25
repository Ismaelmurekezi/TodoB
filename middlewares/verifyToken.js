import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = null;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied, token missing!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified; 
    next(); 
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

