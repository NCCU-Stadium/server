import { UUID } from 'crypto'
import { query } from '../database'
import { NewCourseType } from './post'

export type PatchCourseType = Partial<NewCourseType>

export async function patchCourse(id: UUID, patch: PatchCourseType) {
  if ('decoded' in patch) {
    const { decoded, ...rest } = patch
    patch = rest
  }
  // 忽略什麼都沒有要更新的情況
  if (Object.keys(patch).length === 0) return true

  const fields = Object.keys(patch)
    .map((key, idx) => {
      if (key === 'timeIdx') {
        return `"${key.toLowerCase()}" = $${idx + 2}::integer[]`
      } else {
        return `"${key.toLowerCase()}" = $${idx + 2}`
      }
    })
    .join(', ')
  const values = Object.values(patch)
  const qstring = `UPDATE "course_t" SET ${fields} WHERE id = $1`
  const res = await query(qstring, [id, ...values])
  return res.rowCount === 1
}
