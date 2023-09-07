const express = require("express");
const upload = require("../middleware/Multer");
const router = express.Router();

const {
  createCatagories,
  findCatagories,
} = require("../controller/catagories");
router.route("/createcatagory").post(upload.single("images"), createCatagories);
router.route("/allcatagories").get(findCatagories);

module.exports = router;
