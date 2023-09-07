const mongoose = require("mongoose");

const productReq = mongoose.Schema({
  prodid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  buyercomment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("productRequest", productReq);
