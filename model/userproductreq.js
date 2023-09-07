const mongoose = require("mongoose");

const userreq = mongoose.Schema({
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  value: {
    type: String,
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("userreq", userreq);
