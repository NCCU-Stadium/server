import express from 'express'
import reservesRouter from './reserves'
import cartsRouter from './carts'
import coursesRouter from './courses'
import subuserRouter from './subuser'

const router = express.Router()

router.use('/courses', coursesRouter)
router.use('/reserves', reservesRouter)
router.use('/carts', cartsRouter)
router.use('/subuser', subuserRouter)

export default router
