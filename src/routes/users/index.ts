import express from 'express'
import reservesRouter from './reserves'
import cartsRouter from './carts'
import coursesRouter from './courses'
import subuserRouter from './subuser'
import transactionRouter from './transactions'
import { adminProtect, jwtProtect } from '../middleware'
import { getUser } from '../../database/users/get'
import { changeUnpaid, changePoint } from '../../database/users/post'

const router = express.Router()

router.use('/courses', coursesRouter)
router.use('/reserves', reservesRouter)
router.use('/carts', cartsRouter)
router.use('/subusers', subuserRouter)
router.use('/transactions', transactionRouter)

/**
 * GET /users/points
 * Get user's point number
 */
router.get('/points', jwtProtect, async (req, res) => {
  const { mail } = req.body.decoded
  const user = await getUser(mail)
  if (user.error) return res.status(500).send(user.error)
  return res.send({ points: user.point })
})

/**
 * GET /users/points
 * Get user's point number
 */
router.get('/unpaid', jwtProtect, async (req, res) => {
  const { mail } = req.body.decoded
  const user = await getUser(mail)
  if (user.error) return res.status(500).send(user.error)
  return res.send({ unpaid: user.unpaid })
})

type changePointQueryType = {
  mail: string
  req: express.Request
  res: express.Response
}
async function changePointQuery(props: changePointQueryType): Promise<any> {
  const { mail, req, res } = props
  const { amount } = req.body
  const { operation } = req.params
  if (!req.body.amount || !req.params.operation)
    return res.status(400).send('amount and operation are required')
  if (operation !== 'add' && operation !== 'sub')
    return res.status(400).send('operaion is invalid')
  const changeRes = await changePoint({ email: mail, amount, operation })
  if (changeRes.error) return res.status(500).send({ error: changeRes.error })
  return res.send({ point: changeRes.point, mail: changeRes.mail })
}
/**
 * POST /users/points/user/:operation
 * Change point number
 */
router.post('/points/user/:operation', jwtProtect, async (req, res) => {
  const { mail } = req.body.decoded
  await changePointQuery({ mail, req, res })
  return
})

/**
 * POST /users/points/admin/:operation
 * Change point number
 */
router.post(
  '/points/admin/:operation',
  jwtProtect,
  adminProtect,
  async (req, res) => {
    const { targetUser } = req.body
    await changePointQuery({ mail: targetUser, req, res })
    return
  }
)

/**
 * POST /users/unpaid/add
 * Change unpaid number
 */
router.post('/unpaid/add', jwtProtect, async (req, res) => {
  const { mail } = req.body.decoded
  const { amount } = req.body
  if (!amount) return res.status(400).send({ error: 'amount is required' })
  const changeRes = await changeUnpaid({
    email: mail,
    amount,
    operation: 'add',
  })
  if (changeRes.error) return res.status(500).send({ error: changeRes.error })
  return res.send({ unpaid: changeRes.unpaid })
})

/**
 * POST /users/unpaid/admin/:operation
 * Change unpaid number
 */
router.post(
  '/unpaid/admin/:operation',
  jwtProtect,
  adminProtect,
  async (req, res) => {
    const { amount, targetUser } = req.body
    const { operation } = req.params

    if (!amount || !targetUser)
      return res
        .status(400)
        .send({ error: 'amount and targetUser are required' })
    if (!operation || (operation !== 'add' && operation !== 'sub'))
      return res.status(400).send({ error: 'operation is required' })

    const changeRes = await changeUnpaid({
      email: targetUser,
      amount,
      operation,
    })
    if (changeRes.error) return res.status(500).send({ error: changeRes.error })
    return res.send(changeRes)
  }
)

export default router
