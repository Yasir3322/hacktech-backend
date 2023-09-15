const { default: mongoose } = require("mongoose");
const chatUser = require("../model/chatusers");

const chatuser = async (req, res) => {
  const { id } = req.params;
  const chatusers = await chatUser.aggregate([
    {
      $match: {
        userid: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "chatwith",
        foreignField: "_id",
        as: "chatuser",
      },
    },
  ]);
  res.status(200).json({ chatusers });
};

module.exports = { chatuser };
