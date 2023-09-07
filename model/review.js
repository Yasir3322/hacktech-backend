const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    buyerName: {
      type: String,
    },
    buyerImage: {
      type: String,
    },
    buyerComment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    sellerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    buyerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
