const mongoose = require("mongoose");
const gdSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regNo: { type: String, required: true, unique: true },
    dept: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    subject_knowledge: { type: Number, required: true, min: 0, max: 10 },
    communication_skills: { type: Number, required: true, min: 0, max: 10 },
    body_language: { type: Number, required: true, min: 0, max: 10 },
    listening_skills: { type: Number, required: true, min: 0, max: 10 },
    active_participation: { type: Number, required: true, min: 0, max: 10 },
  },
  { collection: "gd" },
);

module.exports = mongoose.model("Gd", gdSchema);
