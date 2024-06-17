import { query } from '../../database'

export async function getUserCourses(mail: string) {
  const qstring = `
    select c.*
    from user_take_course_t
    join course_t as c on course_id = id
    where user_mail = $1
  `
  const res = await query(qstring, [mail])
  if (res.rowCount === 0) {
    return { error: 'No attended course' }
  }
  return { arr: res.rows }
}
