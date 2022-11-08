import mongodb from 'mongodb'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import asyncHandler  from 'express-async-handler'

const User = require('../models/user')

import { validateRegister, validateLogin } from '../validation/user'

/*
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
export const registerUser = asyncHandler(async (req: any, res: any) => { // * req: Request, res: Response, next: NextFunction (import { Request, Response, NextFunction } from 'express')
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) return res.status(400).json(errors)

  const { name, email, password } = req.body

  const userExists = await User.findOne({ email }) // Check if user exists

  if (userExists) return res.status(400).json({ email: 'User already exists' })

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({ name, email, password: hashedPassword }) // Create user

  if (user) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    return res.status(400).json('Invalid user data')
  }
})

/*
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req: any, res: any) => {
  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) return res.status(400).json(errors)

  const { email, password } = req.body

  const user = await User.findOne({ email }) // Check for user email

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    return res.status(400).json('Invalid credentials')
  }
})

/*
 * @desc Get user data
 * @route GET /api/users/me
 * @access Private
 */
export const getMe = asyncHandler(async (req: any, res: any) => {
  return res.status(200).json(req.user)
})

/*
 * @desc Generate JWT
 */
const generateToken = (id: mongodb.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })
}
