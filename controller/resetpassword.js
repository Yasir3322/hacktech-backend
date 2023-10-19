const User = require("../model/User");
const sgmail = require("@sendgrid/mail");

const API_KEY =
  "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";
sgmail.setApiKey(API_KEY);

const resetpassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  // return;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user !== null) {
    try {
      const msg = {
        from: "muhammadusman28510@gmail.com",
        to: `${email}`,
        subject: "Reset Your Password",
        text: `http://127.0.0.1:5173/resetpassword/${user._id}`,
      };
      sgmail
        .send(msg)
        .then(() => {
          res.status(200).json({ message: "mail send successfully" });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({ message: "mail failed" });
        });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You are not Register" });
  }
};

module.exports = resetpassword;
