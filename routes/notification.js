const express = require("express");

const router = express.Router();

const {
  createNotification,
  allNotification,
} = require("../controller/Notification");

router.route("/createnotification").post(createNotification);
router.route("/allnotification/:id").get(allNotification);

module.exports = router;
