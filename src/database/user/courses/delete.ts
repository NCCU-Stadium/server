import { query } from '../../database'
import { SubUserType } from './post'

export async function removeUserCourse(subUser: SubUserType, course: string) {
  const { mail, name } = subUser
  const qstring = `
    delete from user_take_course_t 
    where user_mail=$1 and user_name=$2 and course_id=$3 returning *
  `
  const res = await query(qstring, [mail, name, course])

  return {
    mail: res.rows[0].title,
    name: res.rows[0].content,
    course_id: res.rows[0].course_id,
    leave_count: res.rows[0].leave_count,
  }
}
