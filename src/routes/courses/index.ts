import express from 'express'
import { jwtProtect } from '../middleware'
import { BodyVerificationError, checkBody, weekday2num } from './util'
import { createCourse } from '../../database/courses/post'
import { createCourseUseTable } from '../../database/course_use_table/post'
import { createCoachIs } from '../../database/coachIs/post'

const router = express.Router()

router.post('/', jwtProtect, async (req, res) => {
  if (req.body.decoded.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to create courses' })
  }
  try {
  const body = checkBody(req.body, true)
  if (weekday2num(body.weekday) !== body.startDay.getDay()) {
    return res
      .status(400)
      .json({ message: 'startDay must be on the same weekday as weekday' })
  }

  // 建立課程
  const newCourse = await createCourse(body)

  if ('error' in newCourse) {
    console.error(newCourse.error)
    return res.status(500).json({ message: newCourse.error })
  }

  // 建立使用桌子
  Array.from({ length: body.weeks }).forEach((_, i) => {
    const dateThisWeek = new Date(
      body.startDay.getTime() + i * 7 * 24 * 60 * 60 * 1000
    )
    body.timeIdx.forEach((timeIdx) => {
      body.usedTableId.forEach(async (usedTableId) => {
        const newTable = await createCourseUseTable({
          courseId: newCourse.id,
          usedTableId,
          tableDate: dateThisWeek,
          timeIdx,
        })
        if ('error' in newTable) {
          console.error(newTable.error)
          return res.status(500).json({ message: newTable.error })
        }
      })
    })
  })

  // 建立教練
  body.coachEmail.forEach(async (coachEmail) => {
    const newCoachIs = await createCoachIs({
      courseId: newCourse.id,
      userMail: coachEmail,
    })

    if ('error' in newCoachIs) {
      console.error(newCoachIs.error)
      return res.status(500).json({ message: newCoachIs.error })
    }
  })

  return res.status(200).json({
    message: 'Success',
    course_id: newCourse.id,
  })
  } catch (e) {
    if (e instanceof BodyVerificationError) {
      return res.status(400).json({ message: e.message })
    }
    console.error(e)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
})

export default router
