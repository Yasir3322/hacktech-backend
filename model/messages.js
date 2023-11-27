const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: {
      type: String,
      required: true,
    },
    socketID: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    userEmail: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
