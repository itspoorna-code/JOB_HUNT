const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define account schema
const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

// Encrypt password before saving it to the database
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if entered password matches stored hash
accountSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Export the model
module.exports = mongoose.model("Account", accountSchema);
