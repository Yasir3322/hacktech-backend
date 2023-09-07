const Review = require("../model/review");

const review = (req, res) => {
  const { id } = req.user;
  const review = Review.create({ ...req.body, buyerid: id });
  res.status(200).json({ review });
};

module.exports = { review };
