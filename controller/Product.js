const Product = require("../model/Product");
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
    return `http://localhost:5000/api/v1/${file.filename}`;
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
  const allProducts = await Product.aggregate([
    {
      $group: {
        _id: "$catagory",
        products: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(200).json({ allProducts });
};

const findUserProducts = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ sellerid: id });
  res.status(200).json({ products });
};

const findSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  res.status(200).json({ product });
};

module.exports = {
  createProduct,
  findAllProducts,
  findUserProducts,
  findSingleProduct,
  editProduct,
};
