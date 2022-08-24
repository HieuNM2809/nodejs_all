const nodemailer = require("nodemailer");

const sendMail = async (mailInfo) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAILHOST,
        port: process.env.MAILPORT,
        secure: false,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail(mailInfo);
}

module.exports = sendMail;