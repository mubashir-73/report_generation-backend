const asyncHandler = require("express-async-handler");
const Gd = require("../models/aptModel");
const jwt = require("jsonwebtoken");

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, registerNo } = req.body;
  if (!email || !registerNo) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await Gd.findOne({ regNo: registerNo });
  if (user && email === user.email && registerNo === user.regNo) {
    const accessToken = jwt.sign(
      {
        user: {
          registerNo: user.regNo,
          email: user.email,
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
});

module.exports = { currentUser, loginUser };
