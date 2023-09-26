const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    reviewby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    reviewerComment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
