import { UUID } from 'crypto'
import { query } from '../database'
import { NewCourseType } from './post'

type ExistCourseType = NewCourseType & { id: UUID }

export async function getCourse(
  id: UUID
): Promise<ExistCourseType | { error: string }>
export async function getCourse(): Promise<ExistCourseType[]>
export async function getCourse(id?: UUID) {
  if (id) {
    const qstring = 'select * from "course_t" where id = $1'
    const res = await query(qstring, [id])
    if (res.rowCount === 0) {
      return { error: 'course not found' }
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
    }
  } else {
    const qstring = 'select * from "course_t"'
    const res = await query(qstring, [])
    return res.rows.map((row) => ({
      id: row.id,
      title: row.title,
      timeSlot: row.timeslot,
      weekday: row.weekday,
      courseType: row.coursetype,
      duration: row.duration,
      weeks: row.weeks,
      max: row.max,
      content: row.content,
      startDay: row.startday,
      fee: row.fee,
      timeIdx: row.timeidx,
    }))
  }
}
