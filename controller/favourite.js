const { default: mongoose } = require("mongoose");
const Favourite = require("../model/favourite");

const favourite = async (req, res) => {
  const { id } = req.user;
  const favourite = await Favourite.create({ ...req.body, userid: id });
  res.status(200).json({ favourite });
};

const findFavourite = async (req, res) => {
  const { id } = req.params;
  const favouriteProducts = await Favourite.aggregate([
    {
      $match: {
        userid: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productid",
        foreignField: "_id",
        as: "products",
      },
    },
  ]);
  res.status(200).json({ favouriteProducts });
};

const deleteFavourite = async (req, res) => {
  const { id } = req.params;
  const deleteFavProd = await Favourite.findOneAndRemove({ productid: id });
  res.status(200).json({ deleteFavProd });
};

module.exports = { favourite, findFavourite, deleteFavourite };
