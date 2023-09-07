const { default: mongoose } = require("mongoose");
const Cart = require("../model/cart");

const createCart = async (req, res) => {
  const { id } = req.user;
  const cart = await Cart.create({ ...req.body, buyerid: id });
  res.status(200).json({ cart });
};

const getUserCart = async (req, res) => {
  const { id } = req.user;
  const items = await Cart.aggregate([
    {
      $match: {
        buyerid: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productid",
        foreignField: "_id",
        as: "product",
      },
    },
  ]);
  res.status(200).json({ items });
};

const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const item = await Cart.findOneAndRemove({ _id: id });
  res.status(200).json({ item });
};

module.exports = { createCart, getUserCart, removeFromCart };
