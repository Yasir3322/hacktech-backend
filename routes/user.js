const express = require("express");

const router = express.Router();
const { createUser, loginUser } = require("../controller/user");
router.route("/createuser").post(createUser);
router.route("/loginuser").post(loginUser);
module.exports = router;
