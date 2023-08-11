import asyncHandler from 'express-async-handler'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

import { TExpressHandler } from '../types/handlers'
import { TGenerateToken } from '../types/auth'
import { IUser } from '../types/models'
import { validateRegister, validateLogin } from '../validation/user'
import User from '../models/user'

/*
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
export const registerUser: TExpressHandler = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) res.status(400).json(errors)

  const { name, email, password } = req.body

  const userExists = await User.findOne({ email }) // Check if user exists

  if (userExists) res.status(400).json({ email: 'User already exists' })

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  }) // Create user

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id || '')
    })
  } else {
    res.status(400).json('Invalid user data')
  }
})

/*
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser: TExpressHandler = asyncHandler(async (req, res) => {
  console.log('>>> req.body: ', req.body)

  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) res.status(400).json(errors)

  const { email, password } = req.body
  const user: IUser | null = await User.findOne({ email }) // Check for user email

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json('Invalid credentials')
  }
})

/*
 * @desc Get user data
 * @route GET /api/users/me
 * @access Private
 */
export const getMe: TExpressHandler = asyncHandler(async (req, res) => {
  res.status(200).json(req.body?.user)
})

/*
 * @desc Generate JWT
 */
const generateToken: TGenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })
}
