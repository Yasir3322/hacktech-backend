const Catagory = require("../model/catagories");

const createCatagories = async (req, res) => {
  const catagory = await Catagory.create({
    title: req.body.title,
    images: `${req.file.filename}`,
  });
  res.status(200).json({ catagory });
};

const findCatagories = async (req, res) => {
  const catagories = await Catagory.find({});
  res.status(200).json({ catagories });
};

module.exports = { createCatagories, findCatagories };
