const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("cart", cartSchema);
