const User = require("../model/User");
const sgmail = require("@sendgrid/mail");
const { sendmail } = require("../utils/sendmail");

const API_KEY =
  "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";
sgmail.setApiKey(API_KEY);

const resetpassword = async (req, res) => {
  const { email, url } = req.body;
  // return;
  console.log(email)
  try {

    const user = await User.findOne({ email: email.email });
    const options = {
      from: "trojansquareusc@gmail.com",
      to: `${email.email}`,
      subject: "Reset Your Password",
      text: `${url}/${user._id}`,
    };

    sendmail(options)
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message })
  }

};

module.exports = resetpassword;
