const OTP = require("../models/optModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter verified successfully:", success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

const sendOTP = async ({ email, subject, message, duration = 10 }) => {
  try {
    console.log("Sending email...");
    if (!email || !subject || !message) {
      throw new Error("Provide values for email, subject, and message");
    }

    await OTP.deleteOne({ email });

    const generatedOTP = generateOTP();
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p>
             <p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>Your OTP is ${generatedOTP}</b></p>
             <p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
    };

    await sendEmail(mailOptions);

    const hashedOTP = await bcrypt.hash(generatedOTP, 10);
    const newOTP = new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * duration,
    });

    return await newOTP.save();
  } catch (err) {
    console.error("Error in sendOTP:", err);
    throw err;
  }
};

const generateOTP = () => {
  return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

module.exports = { sendOTP, generateOTP };
