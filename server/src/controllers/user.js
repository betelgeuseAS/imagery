const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/user');

const { validateRegister, validateLogin } = require('../validation/user');

/*
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // Check if user exists

  if (userExists) return res.status(400).json({ email: "User already exists" });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword }); // Create user

  if (user) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else { return res.status(400).json('Invalid user data'); }
});

/*
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  const user = await User.findOne({ email }); // Check for user email

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    return res.status(400).json('Invalid credentials');
  }
})

/*
 * @desc Get user data
 * @route GET /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });
}

module.exports = { registerUser, loginUser, getMe };
