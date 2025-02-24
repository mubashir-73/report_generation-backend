const express = require("express");
const {
  getGdScores,
  getGdScore,
  getaptScores,
  getaptScore,
} = require("../controllers/scoreController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.route("/gd").get(getGdScores);
router.route("/apt").get(getaptScores);
router.get("/gd/pc", validateToken, getGdScore);
router.get("/apt/pc", validateToken, getaptScore);

module.exports = router;
