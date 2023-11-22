const Message = require("../model/messages");
const User = require("../model/User");
const Notification = require("../model/notification");
const Channels = require("pusher");
const nodeMailer = require("nodemailer");
const { sendmail } = require("../utils/sendmail");

const channels = new Channels({
  appId: "1663602",
  key: "1904b460da23661d8163",
  secret: "9f1b5ab983407f080226",
  cluster: "ap2",
  useTLS: true,
});

const messages = async (req, res) => {
  const { to } = req.body;
  const user = await User.find({ _id: to });
  const message = await Message.create({ ...req.body, userEmail: user.email });
  if (user !== null) {
    try {
      const options = {
        from: "yasirbangash903@gmail.com",
        // to: `${user.email}`,
        to: "yasirtesting932@gmail.com",
        subject: "New Unread Message From TrojanSquare",
        text: "You have received a new message in your inbox, check now at https://trojansquare.com/chat",
      };

      sendmail(options)
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You are not Register" });
  }
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

const updateMessStatus = async (req, res) => {
  const { id, to } = req.headers;
  try {
    const result = await Message.updateMany(
      { id: id, to: to },
      { $set: { status: "read" } }
    );
    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { messages, getAllMessages, getUserMess, updateMessStatus };
