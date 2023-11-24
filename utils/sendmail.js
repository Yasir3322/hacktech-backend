const nodeMailer = require("nodemailer");
const sendmail = async (Options) => {

    try {

        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            auth: {
                user: "trojansquareusc@gmail.com",
                pass: "oelj rllz kjlr kmij"
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },
        })

        // const mailOptions = {
        //     from: "yasirbangash903@gmail.com",
        //     to: "yasirtesting932@gmail.com",
        //     subject: "New Unread Message From TrojanSquare",
        //     text: "You have received a new message in your inbox, check now at https://trojansquare.com/chat.  Your recipient is now waiting for your reply"
        // }

        const mailRes = await transporter.sendMail(Options);
        console.log({ mailRes })
    } catch (error) {
        console.log(error?.message);
    }
};

module.exports = { sendmail }

