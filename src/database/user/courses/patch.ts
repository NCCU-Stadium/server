import { resourceLimits } from 'worker_threads'
import { query } from '../../database'
import { SubUserType } from './post'
import { error } from 'console'

export async function leaveUserCourse(subUser: SubUserType, course: string) {
  const { mail, name } = subUser
  const qstring = `
    update user_take_course_t set leave_count=leave_count+1
    where user_mail=$1 and user_name=$2 and course_id=$3 returning *
  `
  const res = await query(qstring, [mail, name, course])
  if (res.rowCount === 0) {
    return { error: "fail to leave" }
  }
  
  return {
    mail: res.rows[0].title,
    name: res.rows[0].content,
    course_id: res.rows[0].course_id,
    leave_count: res.rows[0].leave_count
  }
}
