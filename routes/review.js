const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();
const { review } = require("../controller/review");
router.route("/createreview").post(Auth, review);

module.exports = router;
