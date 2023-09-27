const express = require("express");

const router = express.Router();

const {
  createNotification,
  allNotification,
} = require("../controller/notification");

router.route("/createnotification").post(createNotification);
router.route("/allnotification/:id").get(allNotification);

module.exports = router;
