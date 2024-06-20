import { UUID } from 'crypto'
import { query } from '../database'

export async function deleteCourse(id: UUID) {
  const qstring = 'delete from "course_t" where id = $1'
  const res = await query(qstring, [id])
  return res.rowCount
}
