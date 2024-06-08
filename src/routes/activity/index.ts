import express from 'express'
import { jwtProtect } from '../middleware'
import { NewActivityType, createActivity } from '../../database/activity/post'
import { updateActivity } from '../../database/activity/patch'
import {
  TimeRangeType,
  getActivityList,
  getActivity,
} from '../../database/activity/get'

const router = express.Router()

router.post('/', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(403).send({ error: 'permission denied' })
  }
  const { title, content } = req.body
  const newActivity: NewActivityType = { title, content }
  const result = await createActivity(newActivity)
  if (result.error) {
    res.status(500).send(result.error)
  }
  return res.status(200).json({ title: result.title, content: result.content })
})

router.patch('/', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(403).send({ error: 'permission denied' })
  }
  const { id, title, content } = req.body
  const activity: NewActivityType = { title, content }
  const result = await updateActivity(id, activity)
  if (result.error) {
    res.status(500).send(result.error)
  }
  return res.status(200).json({ title: result.title, content: result.content })
})

router.get('/', async (req, res) => {
  const start = req.query.start as string
  const end = req.query.end as string
  const time: TimeRangeType = { start: start, end: end }
  const result = await getActivityList(time)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  res.status(200).json(result.arr)
})

router.get('/:id', async (req, res) => {
  const result = await getActivity(req.params.id)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  res.status(200).json({
    id: result.id,
    title: result.title,
    content: result.content,
    time: result.time,
  })
})

export default router
