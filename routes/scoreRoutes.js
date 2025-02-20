const express = require("express");
const { getGdScores, getGdScore, getaptScores, getaptScore } = require("../controllers/scoreController");

const router = express.Router();

router.route("/").get(getGdScores).get(getaptScores);
router.route("/:id").get(getGdScore).get(getaptScore);

module.exports = router;

