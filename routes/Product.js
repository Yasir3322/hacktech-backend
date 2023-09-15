const express = require("express");

//middleware
const Auth = require("../middleware/Auth");
const upload = require("../middleware/Multer");

const router = express.Router();

const {
  createProduct,
  findAllProducts,
  findUserProducts,
  findSingleProduct,
  editProduct,
} = require("../controller/Product");
router
  .route("/createproduct")
  .post(Auth, upload.array("images"), createProduct);

router.route("/allproducts").get(findAllProducts);
router.route("/:id").get(findUserProducts);
router.route("/singleproduct/:id").get(findSingleProduct);
router.route("/editlisting/:id").patch(editProduct);
module.exports = router;
