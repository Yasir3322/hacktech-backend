const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();

const {
  productRequest,
  getReq,
  updateProductRequest,
} = require("../controller/productRequest");
router.route("/getrequser/:id").get(getReq);
router.route("/productrequest").post(Auth, productRequest);
router.route("/updatereq").patch(updateProductRequest);

module.exports = router;
