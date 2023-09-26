const Message = require("../model/messages");
const Notification = require("../model/notification");
const Channels = require("pusher");

const channels = new Channels({
  appId: "1663602",
  key: "1904b460da23661d8163",
  secret: "9f1b5ab983407f080226",
  cluster: "ap2",
  useTLS: true,
});

const messages = async (req, res) => {
  const { to } = req.body;
  const message = await Message.create({ ...req.body });
  await channels.trigger("hacktech", "new-message", {
    title: "you have unread message",
    url: "/chat",
    notificationto: to,
  });

  await Notification.create({
    title: "you have unread message",
    url: "/chat",
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
