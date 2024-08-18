import express from 'express'
import { jwtProtect } from '../../middleware'
import { buyPointsTrans } from '../../../database/users/transactions/post'

const router = express.Router()

/**
 * POST /users/transactions
 * Buy points transaction
 */
router.post('/', jwtProtect, async (req, res) => {
  const { mail } = req.body.decoded
  const { unpaid, point } = req.body
  if (!unpaid || !point)
    return res.status(400).send({ error: 'missing fields' })
  const transactionRes = await buyPointsTrans({
    mail,
    unpaid,
    point,
    unpaidOp: 'add',
    pointsOp: 'add',
  })
  if (transactionRes.error)
    return res.status(500).send({ error: transactionRes.error })
  return res.send(transactionRes)
})

export default router
