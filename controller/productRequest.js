const { default: mongoose } = require("mongoose");
const productrequest = require("../model/productRequest");
const ChatWith = require("../model/chatusers");
const Product = require("../model/Product");
const Channels = require("pusher");

const channels = new Channels({
  appId: "1663602",
  key: "1904b460da23661d8163",
  secret: "9f1b5ab983407f080226",
  cluster: "ap2",
  useTLS: true,
});

const productRequest = async (req, res) => {
  const { id } = req.user;
  const { prodid } = req.body;
  console.log(req.body);
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
      prodreqid: prodid,
    });
    await ChatWith.create({
      userid: sellerid,
      chatwith: id,
      prodreqid: prodid,
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

const updateProductRequest = async (req, res) => {
  const { prodid, buyerid } = req.headers;
  const updatedProductReq = await productrequest.findOneAndUpdate(
    { prodid: prodid, buyerid: buyerid },
    req.body,
    { new: true, runValidators: true }
  );
  await channels.trigger("hacktech", "update-productreq", {
    prodid,
    ...req.body,
    buyerid,
  });

  res.status(200).json({ updatedProductReq });
};

module.exports = { productRequest, getReq, updateProductRequest };
