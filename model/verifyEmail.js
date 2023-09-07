const mongoose = require("mongoose");

const verifyEmail = mongoose.Schema({
  verificationId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("verifyEmail", verifyEmail);
