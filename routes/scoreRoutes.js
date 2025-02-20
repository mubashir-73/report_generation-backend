const express = require("express");
const { getScores, getScore } = require("../controllers/scoreController");

const router = express.Router();

router.route("/").get(getScores);
router.route("/:id").get(getScore);
module.exports = router;
