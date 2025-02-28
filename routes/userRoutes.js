const express = require("express");
const {
  loginUser,
  currentUser,
  registerAdmin,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerAdmin);
router.get("/current", validateToken, currentUser);
module.exports = router;
