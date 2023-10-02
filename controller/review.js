const { default: mongoose } = require("mongoose");
const Review = require("../model/review");
const User = require("../model/User");

const review = async (req, res) => {
  const review = await Review.create({ ...req.body });
  res.status(200).json({ review });
};

const getUserReview = async (req, res) => {
  const { id } = req.params;
  // const reviews = await Review.find({ reviewto: id });
  const reviews = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "reviewto",
        as: "allreviews",
      },
    },
  ]);
  res.status(200).json({ reviews });
};

module.exports = { review, getUserReview };
