const express = require("express");

const router = express.Router();

const {
  messages,
  getAllMessages,
  getUserMess,
  updateMessStatus,
} = require("../controller/messages");
router.route("/newmessage").post(messages);
router.route("/allmessages").get(getAllMessages);
router.route("/getusermessage").get(getUserMess);
router.route("/updatestatus").patch(updateMessStatus);
module.exports = router;
