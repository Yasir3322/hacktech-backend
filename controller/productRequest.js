const productrequest = require("../model/productRequest");

const productRequest = async (req, res) => {
  const { id } = req.user;
  const productRequest = await productrequest.create({
    ...req.body,
    buyerid: id,
  });
  res.status(200).json({ productRequest });
  //   res.send("hi");
};

module.exports = { productRequest };
