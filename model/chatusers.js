const mongoose = require("mongoose");

const chatUserSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  chatwith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  prodreqid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("chatuser", chatUserSchema);
