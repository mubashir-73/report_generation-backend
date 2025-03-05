const asyncHandler = require("express-async-handler");
const Gd = require("../models/aptModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Otp = require("../models/optModel");
const bcrypt = require("bcrypt");
const { sendOTP } = require("../utils/otpControl");

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });
    res.status(200).json(createdOTP);
  } catch (err) {
    res.status(400);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, registerNo } = req.body;

  if (!email || !registerNo) {
    res.status(400).json({ message: "Email and registration number are mandatory!" });
    return;
  }

  const gd = await Gd.findOne({ email: email });
  if (gd && email === gd.email && registerNo === gd.regNo) {
    await sendOTP({
      email,
      name: gd.username,
      subject: "OTP for login",
      message: "OTP for login",
      duration: 30,
    });
    res.status(200).json({ message: "OTP sent successfully" });
    return;
  } else {
    res.status(401).json({ message: "Invalid email or registration number" });
    return;
  }
});

const VerifyOTP = asyncHandler(async (req, res) => {
  const { otp, email, registerNo } = req.body;

  if (!otp || !email || !registerNo) {
    return res
      .status(400)
      .json({ message: "OTP, Email, and Register Number are required." });
  }

  const user = await Otp.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found. Check your email." });
  }

  const gd = await Gd.findOne({ regNo: registerNo });
  if (!gd) {
    return res
      .status(404)
      .json({ message: "User not found. Check your register number." });
  }

  // Ensure user.otp exists before comparing
  if (!user.otp) {
    return res
      .status(400)
      .json({ message: "OTP expired or invalid. Please request a new one." });
  }

  // Compare the provided OTP with the hashed OTP stored in the database
  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid OTP. Please try again." });
  }

  // Generate access token
  const accessToken = jwt.sign(
    {
      user: {
        registerNo: gd.regNo,
        email: gd.email,
        role: "user", // Assuming role is 'user' for OTP verification
      },
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  return res.status(200).json({ accessToken });
});
module.exports = { currentUser, loginUser, registerAdmin, VerifyOTP };
