const Notification = require("../model/notification");

const createNotification = async (req, res) => {
  const notification = await Notification.create({ ...req.body });
  res.status(200).json({ notification });
};

const allNotification = async (req, res) => {
  const { id } = req.params;
  const allnotification = await Notification.find({ notificationto: id });
  res.status(200).json({ allnotification });
};

module.exports = { createNotification, allNotification };
