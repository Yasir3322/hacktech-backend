const { default: mongoose } = require("mongoose");
const productrequest = require("../model/productRequest");
const ChatWith = require("../model/chatusers");
const Product = require("../model/Product");

const productRequest = async (req, res) => {
  const { id } = req.user;
  const { prodid } = req.body;

  const productRequest = await productrequest.create({
    ...req.body,
    buyerid: id,
  });

  const { sellerid } = await Product.findById({ _id: prodid }).select(
    "sellerid"
  );
  if (sellerid) {
    await ChatWith.create({
      userid: id,
      chatwith: sellerid,
    });
    await ChatWith.create({
      userid: sellerid,
      chatwith: id,
    });
  }

  res.status(200).json({ productRequest });
  //   res.send("hi");
};

const getReq = async (req, res) => {
  const { id } = req.params;

  const productReq = await productrequest.aggregate([
    {
      $match: {
        buyerid: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "prodid",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        sellerid: "$product.sellerid",
        buyerid: "$buyerid",
      },
    },
  ]);
  res.status(200).json({ productReq });
};

module.exports = { productRequest, getReq };
