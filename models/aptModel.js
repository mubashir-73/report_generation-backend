const mongoose = require("mongoose");
const aptSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regNo: { type: String, required: true, unique: true },
    dept: { type: String, required: true },
    points: { type: Number, required: true, min: 0, max: 50 },
    aptitude: { type: Number, required: true, min: 0, max: 10 },
    core: { type: Number, required: true, min: 0, max: 10 },
    verbal: { type: Number, required: true, min: 0, max: 10 },
    programming: { type: Number, required: true, min: 0, max: 10 },
    comprehension: { type: Number, required: true, min: 0, max: 10 },
  },
  { collection: "apt" },
);

module.exports = mongoose.model("Apt", aptSchema);
