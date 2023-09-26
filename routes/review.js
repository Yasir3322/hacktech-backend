const express = require("express");
const router = express.Router();
const { review, getUserReview } = require("../controller/review");
router.route("/createreview").post(review);
router.route("/getuserreviews/:id").get(getUserReview);
module.exports = router;
