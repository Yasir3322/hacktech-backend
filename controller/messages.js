const Message = require("../model/messages");
const Notification = require("../model/notification");

const messages = async (req, res) => {
  const { to } = req.body;
  const message = await Message.create({ ...req.body });
  await Notification.create({
    text: "you have unread message",
    link: "/chat",
    notificationto: to,
  });

  res.status(200).send({ message });
};

const getAllMessages = async (req, res) => {
  const allMessages = await Message.find({});
  res.status(200).json({ allMessages });
};

const getUserMess = async (req, res) => {
  const { id, to } = req.headers;
  console.log(id, to);
  const messages = await Message.find({ id: id, to: to });
  res.status(200).json({ messages });
};

module.exports = { messages, getAllMessages, getUserMess };
