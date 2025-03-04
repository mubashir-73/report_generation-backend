const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Invalid token");
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      req.user = decoded.user;
      console.log(req.user);
      next();
    });
    if (!token) {
      console.log("No token provided");
      res.status(401).json({ message: "No token provided" });
      return;
    }
  }
});

module.exports = validateToken;
