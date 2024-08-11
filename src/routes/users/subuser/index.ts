import express from 'express'
import { jwtProtect } from '../../middleware'
import { createSubuser } from '../../../database/users/post'
import { deleteSubuser } from '../../../database/users/delete'
import { getSubuser, getSubuserInfo } from '../../../database/users/get'
const router = express.Router()

/**
 * POST /users/subuser/{username}
 * Create a subuser
 */
router.post('/:username', jwtProtect, async (req, res) => {
  const { username } = req.params
  const { mail } = req.body.decoded
  const { avatar, gender, birth } = req.body
  if (!avatar || !gender || !birth) {
    return res.status(400).json('missing required fields')
  }
  // prettier-ignore
  const result = await createSubuser({ email: mail, username, avatar, gender, birth })
  if (result.error) {
    return res
      .status(500)
      .json({ message: 'Error creating subuser', error: result.error })
  }
  return res.status(200).send('ok')
})

/**
 * DELETE /users/subuser/{username}
 * Delete a subuser
 */
router.delete('/:username', jwtProtect, async (req, res) => {
  const { username } = req.params
  const { mail } = req.body.decoded
  const result = await deleteSubuser(mail, username)
  if (result.error) {
    return res
      .status(500)
      .json({ message: 'Error deleting subuser', error: result.error })
  }
  return res.status(200).send('Deleted')
})

/**
 * GET /users/subuser/{mail}
 * Get list of subusers
 */
router.get('/:mail', async (req, res) => {
  const { mail } = req.params
  const result = await getSubuser(mail)
  if (result.error) {
    return res
      .status(500)
      .json({ message: 'Error geting subuser', error: result.error })
  }
  return res.status(200).json(result.arr)
})

/**
 * GET /users/subuser/{mail}/{username}
 * Get info of specified subuser
 */
router.get('/:mail/:username', async (req, res) => {
  const { mail, username } = req.params
  const result = await getSubuserInfo(mail, username)
  if (result.error) {
    return res
      .status(500)
      .json({ message: 'Error geting subuser', error: result.error })
  }
  return res.status(200).json(result.arr)
})

export default router
