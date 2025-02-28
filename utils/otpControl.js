/*const OTP = require("../models/optModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent successfully");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

const sendOTP = async ({ email, subject, message, duration = 10 }) => {
  try {
    if (!(email && subject && message)) {
      throw new Error("Provide values for email,subject and message");
    }
    await OTP.deleteOne({ email });
    const generatedOTP = await generateOTP();
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>Your OTP is ${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
    };
    await sendEmail(mailOptions);
    const hashedOTP = await bcrypt.hash(generatedOTP, 10);
    const newOTP = new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (err) {
    console.log(err);
  }
};

const generateOTP = async () => {
  try {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
  } catch (err) {
    throw err;
  }
};

module.exports = { sendOTP, generateOTP };*/
