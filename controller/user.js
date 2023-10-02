const User = require("../model/User");
const sgmail = require("@sendgrid/mail");
const VerifyEmail = require("../model/verifyEmail");
const { v4: uuidv4 } = require("uuid");

const API_KEY =
  "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";
sgmail.setApiKey(API_KEY);

const createUser = async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    const user = await User.create({ ...req.body });
    const token = user.createjwt();
    res.status(200).json({ user: user, token: token });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (isPasswordCorrect) {
      const token = await user.createjwt();
      res.status(200).json({ user, token });
    }
  } else {
    res.status(403).json({ message: "user not found" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  console.log(req.file);
  const image = {
    image: `${req.file.filename}`,
  };
  // return;
  const newUser = await User.findOneAndUpdate({ _id: id }, image, {
    new: true,
    runValidator: true,
  });
  res.status(200).json({ newUser });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.status(200).json({ user });
};

module.exports = { createUser, loginUser, updateUser, getUser };
