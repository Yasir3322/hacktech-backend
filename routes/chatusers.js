const express = require("express");

const router = express.Router();
const { chatuser } = require("../controller/chatusers");
router.route("/chatusers").post(chatuser);
router.route("/getchatusers/:id").get(chatuser);

module.exports = router;
