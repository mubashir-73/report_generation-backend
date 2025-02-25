const asyncHandler = require("express-async-handler");
const Gd = require("../models/gdModel");
const Apt = require("../models/aptModel");

const getScores = asyncHandler(async (req, res) => {
  const GdScores = await Gd.find();
  const aptScores = await Apt.find();
  const Score = [...GdScores, ...aptScores];
  console.log(Score);
  res.status(200).json(Score);
});

const getScore = asyncHandler(async (req, res) => {
  const GdScore = await Gd.findOne({ regNo: req.user.registerNo });
  const aptScore = await Apt.findOne({ regNo: req.user.registerNo });
  const Score = [GdScore, aptScore].filter(Boolean);
  console.log(Score);
  res.status(200).json(Score);
});

module.exports = { getScores, getScore };
