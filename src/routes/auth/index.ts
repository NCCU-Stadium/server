import express from 'express'
import { encryptPassword, comparePassword, generateJWT } from './util'
import { createUser } from '../../database/user/post'
import type { NewUserType } from '../../database/user/post'
import { getUser } from '../../database/user/get'

const router = express.Router()

router.get('/', async (_req, res) => {
  res.status(200).send('Auth routes are available!')
})

router.post('/register', async (req, res) => {
  const { email, password, phone, role } = req.body
  const hasUser = await getUser(email)
  if (!hasUser.error) {
    return res.status(409).json({ error: 'user already exists' })
  }
  const encrypted = encryptPassword(password)
  const newUser: NewUserType = { mail: email, pass: encrypted, phone, role }
  const result = await createUser(newUser)
  if (result.error) {
    res.status(500).json({ error: result.error })
  }
  return res
    .status(200)
    .json({ mail: result.mail, role: result.role, phone: result.phone })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  // check if user exists
  const user = await getUser(email)
  if (user.error) {
    res.status(404).json({ error: user.error })
  }
  // check if password matches
  if (!comparePassword(password, user.pass)) {
    return res.status(401).json({ error: 'passwords do not match' })
  }
  // return user info & jwtToken
  const jwtToken = generateJWT(user.mail, user.role)
  res.status(200).json({ email, role: user.role, jwtToken })
})

export default router
