const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();

const { productRequest, getReq } = require("../controller/productRequest");
router.route("/getrequser/:id").get(getReq);
router.route("/productrequest").post(Auth, productRequest);

module.exports = router;
