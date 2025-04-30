const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A job requires a title"],
  },
  description: {
    type: String,
    required: true,
  },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  available: {
    type: Boolean,
    default: true, // Default set to true
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
