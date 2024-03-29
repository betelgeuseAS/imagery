import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

import { IUserDoc, IUserModel } from './user.interfaces'
import toJSON from '../toJSON/toJSON'
import paginate from '../paginate/paginate'
import { roles } from '../../config/roles'

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number')
        }
      },
      private: true // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// Add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })

  return !!user
})

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema)

export default User
