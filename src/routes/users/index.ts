import express from 'express'
import reservesRouter from './reserves'
import cartsRouter from './carts'

const router = express.Router()

router.use('/reserves', reservesRouter)
router.use('/carts', cartsRouter)

export default router
