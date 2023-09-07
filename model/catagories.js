const mongoose = require("mongoose");

const catagorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("catagory", catagorySchema);
