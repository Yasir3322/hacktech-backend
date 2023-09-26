const Review = require("../model/review");

const review = async (req, res) => {
  const review = await Review.create({ ...req.body });
  res.status(200).json({ review });
};

const getUserReview = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ reviewto: id });
  res.status(200).json({ reviews });
};

module.exports = { review, getUserReview };
