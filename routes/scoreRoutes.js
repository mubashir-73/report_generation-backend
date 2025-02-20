const express = require("express");
const { getScores } = require("../controllers/scoreController");

const router = express.Router();

router.route("/").get(getScores);

module.exports = router;
