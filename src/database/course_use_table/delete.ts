import { UUID } from 'crypto'
import { query } from '../database'

export async function deleteCourseUseTable(courseId: UUID) {
  const qstring = `DELETE FROM "course_use_table_t" WHERE "courseid" = $1`
  const res = await query(qstring, [courseId])
  return res.rowCount
}
