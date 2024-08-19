import { UUID } from 'crypto'
import express from 'express'
import { adminProtect, jwtProtect } from '../middleware'
import { checkBody, weekday2num } from './util'
import { createNewTable } from '../../database/table/post'
import { createCourseUseTable } from '../../database/course_use_table/post'
import { createCoachIs } from '../../database/coachIs/post'
import { getCourse } from '../../database/courses/get'
import { deleteCoachIs } from '../../database/coachIs/delete'
import { deleteCourseUseTable } from '../../database/course_use_table/delete'
import { deleteCourseSingleTransaction } from '../../database/courses/delete'
import { patchCourse } from '../../database/courses/patch'
import {
  type NCSTProps,
  type NewTableType,
  createCourseSingleTransaction,
} from '../../database/courses/post'

const router = express.Router()

router.post('/', jwtProtect, adminProtect, async (req, res) => {
  const body = checkBody(req.body, true)
  if (weekday2num(body.weekday) !== body.startDay.getDay()) {
    return res
      .status(400)
      .json({ message: 'startDay must be on the same weekday as weekday' })
  }

  let newtable: NewTableType[] = []
  Array.from({ length: body.weeks }).forEach((_, i) => {
    const dateThisWeek = new Date(
      body.startDay.getTime() + i * 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString('fr-CA')
    body.timeIdx.forEach((timeIdx) => {
      body.usedTableId.forEach(async (usedTableId) => {
        newtable.push({
          timeIdx,
          tableDate: dateThisWeek,
          tableId: usedTableId,
        })
      })
    })
  })

  let coachIs: { userMail: string }[] = []
  body.coachEmail.forEach(async (coachEmail) => {
    coachIs.push({ userMail: coachEmail })
  })

  const ncst: NCSTProps = {
    newcourse: body,
    newtable,
    coachIs,
  }
  const result = await createCourseSingleTransaction(ncst)
  if ('error' in result) {
    console.error(result.error)
    return res.status(500).json({ message: result.error })
  }
  return res.status(200).json({
    message: 'Success',
    course_id: result.id,
  })
})

router.patch('/:course_id', jwtProtect, async (req, res) => {
  if (req.body.decoded.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update courses' })
  }
  const body = checkBody(req.body, false)
  const courseId = req.params.course_id
  if (
    !courseId ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      courseId
    ) === false
  ) {
    return res.status(400).json({ message: 'course id must be a UUID' })
  }

  // 更改使用桌子
  if (
    body.weeks !== undefined &&
    body.timeIdx !== undefined &&
    body.usedTableId !== undefined &&
    body.startDay !== undefined
  ) {
    await deleteCourseUseTable(courseId as UUID)
    const timeIdxs = body.timeIdx
    const usedTableIds = body.usedTableId
    const startDay = body.startDay
    Array.from({ length: body.weeks }).forEach((_, i) => {
      const dateThisWeek = new Date(
        startDay.getTime() + i * 7 * 24 * 60 * 60 * 1000
      )
      timeIdxs.forEach((timeIdx) => {
        usedTableIds.forEach(async (usedTableId) => {
          try {
            await createNewTable({
              timeIdx,
              tableDate: dateThisWeek,
              tableId: usedTableId,
            })
          } catch (e) {
            return res.status(400).json({ message: 'Table already reserved' })
          }
          const newTableUse = await createCourseUseTable({
            courseId: courseId as UUID,
            usedTableId,
            tableDate: dateThisWeek,
            timeIdx,
          })
          if ('error' in newTableUse) {
            console.error(newTableUse.error)
            return res.status(500).json({ message: newTableUse.error })
          }
        })
      })
    })
  } else if (body.weeks || body.timeIdx || body.usedTableId || body.startDay) {
    return res.status(400).json({
      message:
        'weeks, timeIdx, usedTableId and startDay must be provided as whole or none',
    })
  }

  // 更改教練
  if (body.coachEmail) {
    await deleteCoachIs(courseId as UUID)
    body.coachEmail.forEach(async (email) => {
      await createCoachIs({
        courseId: courseId as UUID,
        userMail: email,
      })
    })
  }

  // 更改課程本身
  const { usedTableId, coachEmail, ...restBody } = body
  await patchCourse(courseId as UUID, restBody)

  return res.status(200).json({ message: 'Update successfully.' })
})

router.delete('/:course_id', jwtProtect, adminProtect, async (req, res) => {
  const courseId = req.params.course_id
  const course = await getCourse(courseId as UUID)
  if ('error' in course) {
    return res.status(400).json({ message: course.error })
  }
  const result = await deleteCourseSingleTransaction(courseId as UUID)
  if ('error' in result) {
    return res.status(500).json({ message: result.error })
  }
  return res.status(200).json({ message: 'Delete course successfully' })
})

router.get('/', async (req, res) => {
  const courses = await getCourse()
  return res.status(200).json(
    courses.map((course) => ({
      ...course,
      startDay: course.startDay
        .toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .join('-'),
    }))
  )
})

router.get('/:course_id', async (req, res) => {
  const courseId = req.params.course_id
  if (
    !courseId ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      courseId
    ) === false
  ) {
    return res.status(400).json({ message: 'course id must be a UUID' })
  }
  const course = await getCourse(courseId as UUID)
  if ('error' in course) {
    return res.status(400).json({ message: course.error })
  }
  return res.status(200).json({
    ...course,
    startDay: course.startDay
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('-'),
  })
})

export default router
