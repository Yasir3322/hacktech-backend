const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();

const { productRequest } = require("../controller/productRequest");
router.route("/productrequest").post(Auth, productRequest);

module.exports = router;
