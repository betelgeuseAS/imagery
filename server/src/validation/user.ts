/* eslint-disable @typescript-eslint/no-explicit-any */

const Validator = require('validator')
const isEmpty = require('is-empty')

export const validateRegister = (data: any) => {
  const errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  // Name checks
  if (Validator.isEmpty(data.name)) errors.name = 'Name field is required'

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Password checks
  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required'
  if (Validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = 'Confirm password field is required'
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }
  if (!Validator.equals(data.password, data.confirmPassword))
    errors.confirmPassword = 'Passwords must match'

  return { errors, isValid: isEmpty(errors) }
}

export const validateLogin = (data: any) => {
  const errors = {
    email: '',
    password: ''
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Password checks
  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required'

  return { errors, isValid: isEmpty(errors) }
}

module.exports = { validateRegister, validateLogin }
