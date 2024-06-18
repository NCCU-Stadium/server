import express from 'express'
import { jwtProtect } from '../middleware'
import {
  NewAnnouncementType,
  createAnnouncement,
} from '../../database/announcements/post'
import { updateAnnouncement } from '../../database/announcements/patch'
import {
  TimeRangeType,
  getAnnouncementList,
  getAnnouncement,
} from '../../database/announcements/get'

const router = express.Router()

router.post('/', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(403).send({ error: 'permission denied' })
  }
  const { title, content } = req.body
  const newAnnouncement: NewAnnouncementType = { title, content }
  const result = await createAnnouncement(newAnnouncement)
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
  const Announcement: NewAnnouncementType = { title, content }
  const result = await updateAnnouncement(id, Announcement)
  if (result.error) {
    res.status(500).send(result.error)
  }
  return res.status(200).json({ title: result.title, content: result.content })
})

router.get('/', async (req, res) => {
  const start = req.query.start as string
  const end = req.query.end as string
  const time: TimeRangeType = { start: start, end: end }
  const result = await getAnnouncementList(time)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  res.status(200).json(result.arr)
})

router.get('/:id', async (req, res) => {
  const result = await getAnnouncement(req.params.id)
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
