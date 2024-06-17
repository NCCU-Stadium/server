import express from 'express'
import { jwtProtect } from '../../middleware'
import { subuserCheck } from '../middleware'
import {
  SubUserType,
  addUserCourse,
} from '../../../database/users/courses/post'
import { leaveUserCourse } from '../../../database/users/courses/patch'
import { removeUserCourse } from '../../../database/users/courses/delete'
import { getUserCourses } from '../../../database/users/courses/get'

const router = express.Router()

router.post('/add', jwtProtect, subuserCheck, async (req, res) => {
  const { user_name, course_id } = req.body
  const { mail } = req.body.decoded
  const subUser: SubUserType = { mail, name: user_name }
  try {
    const result = await addUserCourse(subUser, course_id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error) // Repeated add, bad parameter were possible
    res.status(400).send('bad request')
  }
})

router.patch('/leave', jwtProtect, subuserCheck, async (req, res) => {
  const { user_name, course_id } = req.body
  const { mail } = req.body.decoded
  const subUser: SubUserType = { mail, name: user_name }
  const result = await leaveUserCourse(subUser, course_id)
  if (result.error) {
    return res.status(500).json({ message: result.error })
  }
  res.status(200).json({
    message: 'Leave successfully.',
    leaveCount: result.leave_count,
  })
})

router.delete('/remove', jwtProtect, subuserCheck, async (req, res) => {
  const { user_name, course_id } = req.body
  const { mail } = req.body.decoded
  const subUser: SubUserType = { mail, name: user_name }
  try {
    const result = await removeUserCourse(subUser, course_id)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error) // nerver added, or bad parameter were possible
    res.status(400).send('bad request')
  }
})

router.get('/list', jwtProtect, async (req, res) => {
  const mail = req.body.decoded.mail
  const result = await getUserCourses(mail)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  res.status(200).json(result.arr)
})

export default router
