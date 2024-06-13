import express from 'express'
import reservesRouter from './reserves'

const router = express.Router()
router.use('/reserves', reservesRouter)
export default router
