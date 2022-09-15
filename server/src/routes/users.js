const express = require('express');

const { registerUser, loginUser, getMe } = require('../controllers/user');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser); // * POST /api/users/register
router.post('/login', loginUser); // * POST /api/users/login
router.get('/me', protect, getMe); // * GET /api/users/me

module.exports = router;
