const asyncHandler = require("express-async-handler");
const Gd = require("../models/gdModel");

const getScores = asyncHandler(async (req, res) => {
  const scores = await Gd.find();
  res.status(200).json(scores);
});

module.exports = { getScores };
