const express = require("express");

//middleware
const Auth = require("../middleware/Auth");
const upload = require("../middleware/Multer");
const editupload = require("../middleware/EditlistingMulter");

const router = express.Router();

const {
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
} = require("../controller/Product");
router
  .route("/createproduct")
  .post(Auth, upload.array("images"), createProduct);

router.route("/allproducts").get(findAllProducts);
router.route("/:id").get(findUserProducts);
router.route("/singleproduct/:id").get(findSingleProduct);
router.route("/editlisting/:id").patch(editupload.array("images"), editProduct);
router.route("/getuserdetail/:id").get(getProductUserDetail);
router.route("/updatesoldvalue/:id").patch(updateSoldValue);
router.route("/updatelikedvalue/:id").patch(updateLiked);
router.route("/decreaselikedvalue/:id").patch(decreaseLiked);
router.route("/deleteproduct/:id").delete(deleteProduct);
module.exports = router;
