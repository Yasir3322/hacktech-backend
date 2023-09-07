const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();
const { tokenLogin } = require("../controller/tokenLogin");

router.route("/tokenlogin").post(Auth, tokenLogin);

module.exports = router;
