import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied, token missing!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified; 
      console.log(verified)
    next(); 
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
