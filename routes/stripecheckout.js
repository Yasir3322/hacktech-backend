const express = require("express");
const Auth = require("../middleware/Auth");

const router = express.Router();

const { stripecheckout } = require("../controller/stripecheckout");
router.route("/stripecheckout").post(Auth, stripecheckout);

module.exports = router;
