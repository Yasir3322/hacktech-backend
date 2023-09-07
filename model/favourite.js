const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  isliked: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("favourite", favouriteSchema);
