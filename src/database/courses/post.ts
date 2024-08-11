import { UUID } from 'crypto'
import { query } from '../database'

export type NewCourseType = {
  title: string
  timeSlot: 'Morning' | 'Afternoon' | 'Night'
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  courseType: 'group' | 'private'
  duration: number
  weeks: number
  max: number
  content: string
  startDay: Date
  fee: number
  timeIdx: number[]
}

export async function createCourse(newcourse: NewCourseType) {
  const qstring =
    'insert into "course_t" (title, timeslot, weekday, coursetype, duration, weeks, max, content, startday, fee, timeidx) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::integer[]) returning *'
  const res = await query(qstring, [
    newcourse.title,
    newcourse.timeSlot,
    newcourse.weekday,
    newcourse.courseType,
    newcourse.duration,
    newcourse.weeks,
    newcourse.max,
    newcourse.content,
    newcourse.startDay,
    newcourse.fee,
    newcourse.timeIdx,
  ])
  if (res.rowCount === 0) {
    return { error: 'course not created' }
  }
  return {
    id: res.rows[0].id,
    title: res.rows[0].title,
    timeSlot: res.rows[0].timeslot,
    weekday: res.rows[0].weekday,
    courseType: res.rows[0].coursetype,
    duration: res.rows[0].duration,
    weeks: res.rows[0].weeks,
    max: res.rows[0].max,
    content: res.rows[0].content,
    startDay: res.rows[0].startday,
    fee: res.rows[0].fee,
    timeIdx: res.rows[0].timeidx,
  } as { id: UUID } & NewCourseType
}
