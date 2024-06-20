const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log('Login attempt for email:', email);
  if (user) {
    const isMatch = await user.matchPassword(password);
    console.log('Password entered:', password);
    console.log('Password stored in DB:', user.password);
    console.log('Password match:', isMatch);

    if (isMatch) {
      res.json({
        userId: user._id,
        email: user.email,
      });
      return;
    }
  }

  res.status(401);
  throw new Error('Invalid email or password');
});

// Generate User
const generateUser = asyncHandler(async (req, res) => {
  const { email, userId, password } = req.body;
  console.log('Generating user with:', { email, userId, password });

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    email,
    userId,
    password,
  });

  if (user) {
    res.status(201).json({
      userId: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { loginUser, generateUser };
