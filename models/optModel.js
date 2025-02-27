const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const Opt = mongoose.model("Opt", optSchema);

module.exports = Opt;
