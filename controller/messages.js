const Message = require("../model/messages");

const messages = async (req, res) => {
  const message = await Message.create({ ...req.body });
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
