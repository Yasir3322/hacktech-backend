const express = require("express");
const upload = require("../middleware/AwsMulter");
const router = express.Router();

const awsupload = require("../controller/awsupload");
router.route("/upload").post(upload.single("images"), awsupload);

module.exports = router;
