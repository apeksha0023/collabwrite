const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token); // Debug log

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Debug log
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message); // Debug log
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
