const User = require("../model/User");

const tokenLogin = async (req, res) => {
  const { email } = req.user;
  const user = await User.find({ email });
  if (user) {
    res.status(200).json({ user });
  }
};

module.exports = { tokenLogin };
