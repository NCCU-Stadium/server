import { UUID } from 'crypto'
import { query } from '../database'

export type NewCoachIsType = {
  userMail: string
  courseId: UUID
}

export async function createCoachIs(newCoachIs: NewCoachIsType) {
  const qstring =
    'insert into "coachis_t" (user_mail, course_id) values ($1, $2) returning *'
  const res = await query(qstring, [newCoachIs.userMail, newCoachIs.courseId])
  if (res.rowCount === 0) {
    return { error: 'course coach is not created' }
  }
  return {
    userMail: res.rows[0].user_mail,
    courseId: res.rows[0].course_id,
  } as NewCoachIsType
}
