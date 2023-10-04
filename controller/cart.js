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

const increaseQuantity = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Cart.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const decreaseQuantity = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Cart.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCart,
  getUserCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
};
