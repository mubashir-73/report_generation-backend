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
  const { role, email, password, registerNo } = req.body;
  if (!role) {
    res.status(400);
    throw new Error("Role is required");
  }
  switch (role) {
    case "admin":
      if (!email || !role || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
      }
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              role: role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          },
        );
        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        throw new Error("email or password is not valid");
      }
      res.json({ message: "login user" });
      break;
    case "user":
      if (!email || !role || !registerNo) {
        res.status(400);
        throw new Error("All fields are mandatory!");
      }
      const gd = await gd.findOne({ email });
      if (gd) {
        sendOTP({
          email,
          subject: "OTP for login",
          message: "OTP for login",
          duration: 30,
        });
      } else {
        res.status(404);
        throw new Error("username not found!");
      }
      if (sendOTP) {
        res.json({ message: "sent otp successfully" });
      } else {
        res.status(400);
        throw new Error("OTP is not sent");
      }

      break;
    default:
      res.status(400);
      throw new Error("Invalid role");
  }
});

const VerifyOTP = asyncHandler(async (req, res) => {
  const { otp, email, registerNo } = req.body;
  if (!otp || !email || !registerNo) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await Otp.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const gd = await Gd.findOne({ regNo: registerNo });
  if (!gd) {
    res.status(404);
    throw new Error("Register number is not valid");
  }

  // Compare the provided OTP with the hashed OTP stored in the database
  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    res.status(401);
    throw new Error("OTP is not valid");
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
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  res.status(200).json({ accessToken });
});
module.exports = { currentUser, loginUser, registerAdmin, VerifyOTP };
