import express from 'express'
const router = express.Router()

import coursesRouter from './courses'
router.use('/courses', coursesRouter)

export default router
