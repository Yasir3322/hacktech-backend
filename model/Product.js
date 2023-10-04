const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hashtags: {
      type: Array,
    },
    catagory: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false,
    },
    instock: {
      type: Boolean,
      default: true,
    },
    images: {
      type: Array,
      required: true,
    },
    istranding: {
      type: Boolean,
      default: false,
    },
    sellerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    priceid: {
      type: String,
      required: true,
    },
    instock: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    totalliked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
