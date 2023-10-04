const { default: mongoose } = require("mongoose");
const Product = require("../model/Product");
const catagory = require("../model/catagories");
const Channels = require("pusher");
const stripe = require("stripe")(
  "sk_test_51MrYHJEg2I5qxKjJ4EYXuaKNXoJiPBXutcgXzRuKkGVgITnDeDBTQU3f5VtaMnMo138GBPGjfc33aGFCXfenx2Kg0065g0Sp9S"
);

const channels = new Channels({
  appId: "1663602",
  key: "1904b460da23661d8163",
  secret: "9f1b5ab983407f080226",
  cluster: "ap2",
  useTLS: true,
});

const createProduct = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  // res.send("hi");
  // return;

  const { price, title } = req.body;
  const price_for_stripe = price * 100;
  const stripproduct = await stripe.products.create({
    name: title,
    default_price_data: {
      unit_amount: price_for_stripe,
      currency: "usd",
    },
  });

  const { id } = req.user;
  const images_arr = req.files.map((file) => {
    return file.filename;
  });
  // console.log(images_arr);
  // return;
  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    hashtags: req.body.hashtags,
    catagory: req.body.catagory,
    condition: req.body.condition,
    priceid: stripproduct.default_price,
    isOnline: req.body.isOnline,
    images: images_arr,
    sellerid: id,
  });
  await channels.trigger("hacktech", "create-product", product);
  res.status(200).json({ product });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ product });
  // res.send(id);
};

const findAllProducts = async (req, res) => {
  const { userid } = req.headers;
  console.log(userid);
  // const allProducts = await Product.aggregate([
  //   {
  //     $group: {
  //       _id: "$catagory",
  //       products: { $push: "$$ROOT" },
  //     },
  //   },
  // ]);

  const allProducts = await catagory.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "title",
        foreignField: "catagory",
        pipeline: [
          {
            $lookup: {
              from: "favourites",
              localField: "_id",
              foreignField: "productid",
              as: "favourite",
              pipeline: [
                {
                  $match: {
                    userid: new mongoose.Types.ObjectId(userid),
                  },
                },
              ],
            },
          },
        ],
        as: "products",
      },
    },
  ]);
  res.status(200).json({ allProducts });
};

const findUserProducts = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ sellerid: id });
  const totalProductCount = await Product.countDocuments({ sellerid: id });
  res.status(200).json({ products, totalProductCount });
};

const findSingleProduct = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.headers;
  // const product = await Product.findOne({ _id: id });
  // res.status(200).json({ product });

  const product = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "favourites",
        localField: "_id",
        foreignField: "productid",
        pipeline: [
          {
            $match: {
              userid: new mongoose.Types.ObjectId(userid),
            },
          },
        ],
        as: "favourite",
      },
    },
  ]);
  res.status(200).json({ product });
};

const getProductUserDetail = async (req, res) => {
  const { id } = req.params;
  const userProductDetail = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        sellerid: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sellerid",
        foreignField: "_id",
        as: "seller",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "sellerid",
        foreignField: "reviewto",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "reviewby",
              foreignField: "_id",
              as: "reviewerdetail",
            },
          },
        ],
        as: "reviews",
      },
    },
  ]);
  res.status(200).json({ userProductDetail });
};

const updateSoldValue = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { sold: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateLiked = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { totalliked: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const decreaseLiked = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.totalliked > 0) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        { $inc: { totalliked: -1 } },
        { new: true }
      );
      res.status(200).json({ product: updatedProduct });
    } else {
      res.status(400).json({ error: "Value cannot be decreased further" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  findAllProducts,
  findUserProducts,
  findSingleProduct,
  editProduct,
  getProductUserDetail,
  updateSoldValue,
  updateLiked,
  decreaseLiked,
};
