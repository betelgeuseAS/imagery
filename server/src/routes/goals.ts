import express from 'express'

const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goal')
const { protect } = require('../middleware/auth')

const router: express.Router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoal) // * GET POST /api/goals
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal) // * DELETE PUT /api/goals/:id

module.exports = router
