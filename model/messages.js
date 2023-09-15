const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("message", messageSchema);
