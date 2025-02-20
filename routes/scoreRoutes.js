const express = require("express");
const {
  getGdScores,
  getGdScore,
  getaptScores,
  getaptScore,
} = require("../controllers/scoreController");

const router = express.Router();

router.route("/gd").get(getGdScores);
router.route("/apt").get(getaptScores);
router.route("/gd/:id").get(getGdScore);
router.route("/apt/:id").get(getaptScore);

module.exports = router;
