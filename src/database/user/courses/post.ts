import { query } from '../../database'

export type SubUserType = {
  mail: string
  name: string
}

export async function addUserCourse(subUser: SubUserType, course: string) {
  const { mail, name } = subUser
  const qstring = `
    insert into user_take_course_t 
    (user_mail, user_name, course_id, leave_count)
    values ($1, $2, $3, 0) returning *
  `
  const res = await query(qstring, [mail, name, course])

  return {
    mail: res.rows[0].title,
    name: res.rows[0].content,
    course_id: res.rows[0].course_id,
    leave_count: res.rows[0].leave_count,
  }
}
