const User = require("../model/User");
const sgmail = require("@sendgrid/mail");
const { sendmail } = require("../utils/sendmail");

const API_KEY =
  "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";
sgmail.setApiKey(API_KEY);

const resetpassword = async (req, res) => {
  const { email, url } = req.body;
  // return;
  const user = await User.findOne({ email: email.email });
  if (user !== null) {
    try {
      const options = {
        from: "trojansquareusc@gmail.com",
        to: `${email.email}`,
        subject: "Reset Your Password",
        text: `${url}/${user._id}`,
      };

      sendmail(options)
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(404).json({ success: false, message: error });
    }
  } else {
    res.status(500).json({ message: "You are not Register" });
  }
};

module.exports = resetpassword;
