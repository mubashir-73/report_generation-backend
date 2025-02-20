const asyncHandler = require("express-async-handler");
const Gd = require("../models/gdModel");
const apt = require("../models/aptModel")

const getGdScores = asyncHandler(async (req, res) => {
  const GdScores = await Gd.find();
  console.log(GdScores);
  res.status(200).json(GdScores);
});

const getaptScores = asyncHandler(async (req, res) => {
  const aptScores = await apt.find();
  console.log(aptScores);
  res.status(200).json(aptScores);
});

const getGdScore = asyncHandler(async (req, res) => {
  const GdScore = await Gd.find({ email: req.params.id });
  console.log(GdScore);
  res.status(200).json(GdScore);
});

const getaptScore = asyncHandler(async (req, res) => {
  const aptScore = await apt.find({ email: req.params.id });
  console.log(aptScore);
  res.status(200).json(aptScore);
});

module.exports = { getGdScores, getGdScore, getaptScores, getaptScore };

