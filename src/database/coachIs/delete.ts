import { UUID } from 'crypto'
import { query } from '../database'

export async function deleteCoachIs(courseId: UUID) {
  const qstring = `DELETE FROM "coachIs_t" WHERE "course_id" = $1`
  const res = await query(qstring, [courseId])
  return res.rowCount
}
