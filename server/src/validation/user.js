const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegister = (data) => {
  let errors = {};

  // Name checks
  if (Validator.isEmpty(data.name)) errors.name = "Name field is required";

  // Email checks
  if (Validator.isEmpty(data.email)) { errors.email = "Email field is required"; }
  else if (!Validator.isEmail(data.email)) { errors.email = "Email is invalid"; }

  // Password checks
  if (Validator.isEmpty(data.password)) errors.password = "Password field is required";
  if (Validator.isEmpty(data.confirmPassword)) errors.confirmPassword = "Confirm password field is required";
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) errors.password = "Password must be at least 6 characters";
  if (!Validator.equals(data.password, data.confirmPassword)) errors.confirmPassword = "Passwords must match";

  return { errors, isValid: isEmpty(errors) };
};

const validateLogin = (data) => {
  let errors = {};

  // Email checks
  if (Validator.isEmpty(data.email)) { errors.email = "Email field is required"; }
  else if (!Validator.isEmail(data.email)) { errors.email = "Email is invalid"; }

  // Password checks
  if (Validator.isEmpty(data.password)) errors.password = "Password field is required";

  return { errors, isValid: isEmpty(errors) };
};

module.exports = { validateRegister, validateLogin };
