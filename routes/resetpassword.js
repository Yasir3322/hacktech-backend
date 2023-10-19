const express = require("express");

const router = express.Router();
const resetpassword = require("../controller/resetpassword");
router.route("/resetpassword").post(resetpassword);

module.exports = router;
