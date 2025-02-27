const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getScores, getScore } = require("../controllers/scoreController");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/scores", validateToken, authorizeRole("admin"), getScores);
router.get("/score", validateToken, authorizeRole("user", "admin"), getScore);

module.exports = router;
