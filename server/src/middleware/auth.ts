const jwt = require('jsonwebtoken')
import asyncHandler from 'express-async-handler'

import { Request, Response, NextFunction } from 'express'

const User = require('../models/user')

const protect = asyncHandler(async (req: Request | any, res: Response | any, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1] // Get token from header

      const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verify token

      req.user = await User.findById(decoded.id).select('-password') // Get user from the token

      next()
    } catch (error: any) {
      console.log(`Error: ${error.message}`.red)

      res.status(401).json('Not authorized')
    }
  }

  if (!token) {
    res.status(401).json('Not authorized, no token')
  }
})

module.exports = { protect }
