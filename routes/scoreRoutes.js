const express = require("express");
const { getGdScores, getGdScore, getaptScores, getaptScore } = require("../controllers/scoreController");

const router = express.Router();

router.route("/").get(getGdScores);
router.route("/:id").get(getGdScore);
router.route("/").get(getaptScores);
router.route("/:id").get(getaptScore);

module.exports = router;

