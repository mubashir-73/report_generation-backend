const asyncHandler = require("express-async-handler");
const Gd = require("../models/gdModel");

const getScores = asyncHandler(async (req, res) => {
  const scores = await Gd.find();
  console.log(scores);
  res.status(200).json(scores);
});

const getScore = asyncHandler(async (req, res) => {
  const score = await Gd.find({ email: req.params.id });
  console.log(score);
  res.status(200).json(score);
});
module.exports = { getScores, getScore };
