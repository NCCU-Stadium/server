import express from 'express'
import reservesRouter from './reserves'
import cartsRouter from './carts'
import coursesRouter from './courses'

const router = express.Router()

router.use('/courses', coursesRouter)
router.use('/reserves', reservesRouter)
router.use('/carts', cartsRouter)

export default router
