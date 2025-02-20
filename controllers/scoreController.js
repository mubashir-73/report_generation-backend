const asyncHandler = require("express-async-handler");
const Gd = require("../models/gdModel");
const apt = require("../models/aptModel")

const getGdScores = asyncHandler(async (req, res) => {
  const Gdscores = await Gd.find();
  console.log(Gdscores);
  res.status(200).json(Gdscores);
});

const getaptScores = asyncHandler(async (req, res) => {
  const aptscores = await apt.find();
  console.log(aptScores);
  res.status(200).json(aptScores);
});

const getGdScore = asyncHandler(async (req, res) => {
  const Gdscore = await Gd.find({ email: req.params.id });
  console.log(Gdscore);
  res.status(200).json(Gdscore);
});

const getaptScore = asyncHandler(async (req, res) => {
  const aptscore = await apt.find({ email: req.params.id });
  console.log(aptScore);
  res.status(200).json(aptScore);
});

module.exports = { getGdScores, getGdScore, getaptScores, getaptScore };

