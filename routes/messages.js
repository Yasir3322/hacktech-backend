const express = require("express");

const router = express.Router();

const {
  messages,
  getAllMessages,
  getUserMess,
} = require("../controller/messages");
router.route("/newmessage").post(messages);
router.route("/allmessages").get(getAllMessages);
router.route("/getusermessage").get(getUserMess);
module.exports = router;
