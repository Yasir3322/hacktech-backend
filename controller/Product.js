const { default: mongoose } = require("mongoose");
const Product = require("../model/Product");
const catagory = require("../model/catagories");
const { promisify } = require("util");
const fs = require("fs");
const convert = require("heic-convert");
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
  // return;
  console.log(req.files);
  // res.send("hi");
  // return;

  const { price, title } = req.body;
  const price_for_stripe = price * 100;
  console.log(price_for_stripe);
  // return;
  const stripproduct = await stripe.products.create({
    name: title,
    default_price_data: {
      unit_amount: price_for_stripe,
      currency: "usd",
    },
  });

  const { id } = req.user;
  const images_arr = [];
  for (let file of req.files) {
    console.log(file);
    try {
      if (file.filename.includes("heic") || file.filename.includes("HEIC")) {
        const inputBuffer = await promisify(fs.readFile)(
          `${file.destination}/${file.filename}`
        );
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: "PNG",
          quality: 1,
        });
        await promisify(fs.writeFile)(
          `${file.destination}/${file.filename.split(".")[0]}.png`,
          outputBuffer
        );
        images_arr.push(`${file.filename.split(".")[0]}.png`);
        await promisify(fs.unlink)(`${file.destination}/${file.filename}`);
      } else {
        images_arr.push(file.filename);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(images_arr);
  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
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
  const { previousimages } = req.headers;
  const uploadImg = req.files.map((file) => {
    return file.filename;
  });

  const prevImgs = JSON.parse(previousimages);
  const images_arr = [...prevImgs, ...uploadImg];

  const obj = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity[0],
    hashtags: req.body.hashtags,
    catagory: req.body.catagory,
    isOnline: req.body.isOnline,
    condition: req.body.condition,
    instock: req.body.instock,
    istranding: req.body.istranding,
    sellerid: req.body.sellerid,
    priceid: req.body.priceid,
    sold: req.body.sold,
    totalliked: req.body.totalliked,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    favourite: req.body.favourite,
    images: images_arr,
  };

  const { id } = req.params;
  const product = await Product.findByIdAndUpdate({ _id: id }, obj, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ product });
  // res.send(id);
};

const findAllProducts = async (req, res) => {
  console.log(req.query.title);
  const searchTerm = req?.query?.title;
  const { userid } = req.headers;
  console.log({ searchTerm, userid });
  if (userid?.length > 0) {
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
  } else if (searchTerm) {
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
              },
            },
            {
              $match: {
                title: { $regex: searchTerm, $options: "i" }, // Case-insensitive title search
              },
            },
          ],
          as: "products",
        },
      },
    ]);
    res.status(200).json({ allProducts });
  } else {
    const allProducts = await catagory.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "title",
          foreignField: "catagory",
          as: "products",
        },
      },
    ]);
    res.status(200).json({ allProducts });
  }
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

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndRemove({ _id: id });
  res.status(200).json({ deleteProduct });
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
  deleteProduct,
};
