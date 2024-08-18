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

type GetCourseBySubuserResType = {
  courseId: string
  leaveCout: string
  timeSlot: string
  weekDay: string
  courseType: string
  duration: number
  title: string
  weeks: number
  content: string
  startDay: string
  timeIdx: number[]
  fee: number
}
export async function getUserCoursesBySubuser(
  mail: string,
  username: string
): Promise<{ res: GetCourseBySubuserResType[] | null; error: unknown | null }> {
  const qstring = `
    select course_id, timeslot, weekday, coursetype, duration, title, weeks, content, startday, timeidx, fee
    from user_take_course_t 
    inner join course_t 
    on user_take_course_t.course_id = course_t.id 
    where user_mail = $1 and user_name = $2;
  `
  let res
  try {
    res = await query(qstring, [mail, username])
  } catch (err) {
    return { error: err, res: null }
  }
  if (!res || typeof res.rowCount != 'number') return { error: 'No courses found', res: null }
  if (res.rowCount === 0) return { error: null, res: [] }

  let response: GetCourseBySubuserResType[] = []
  res.rows.forEach((row) => {
    response.push({
      courseId: row.course_id,
      leaveCout: row.leave_count,
      timeSlot: row.timeslot,
      weekDay: row.weekday,
      courseType: row.coursetype,
      duration: row.duration,
      title: row.title,
      weeks: row.weeks,
      content: row.content,
      startDay: row.startday,
      timeIdx: row.timeidx,
      fee: row.fee,
    })
  })
  return { res: response, error: null }
}
