const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendResultEmail(to, subject, body) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
  };

  console.log("EMAIL USER:", process.env.EMAIL_USER);
  console.log("EMAIL PASS", process.env.EMAIL_PASS);
  await transporter.sendMail(mailOptions);
}

module.exports = { sendResultEmail };
