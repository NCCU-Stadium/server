import { UUID } from 'crypto'
import { query } from '../database'

export type NewCourseType = {
  title: string
  timeSlot: 'Morning' | 'Afternoon' | 'Night'
  // prettier-ignore
  weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  courseType: 'Group' | 'Private'
  duration: number
  weeks: number
  max: number
  content: string
  startDay: Date
  fee: number
  timeIdx: number[]
}
export type NewTableType = {
  timeIdx: number
  tableDate: string
  tableId: number
}

// New Course Single Transation Props
export type NCSTProps = {
  newcourse: NewCourseType
  coachIs: { userMail: string }[]
  newtable: NewTableType[]
}
export async function createCourseSingleTransaction(props: NCSTProps) {
  const { newcourse, coachIs, newtable } = props
  let insertTableValues = ''
  newtable.forEach((val, idx, arr) => {
    return (insertTableValues +=
      `(${val.timeIdx}, '${val.tableDate}', ${val.tableId})` +
      `${idx === arr.length - 1 ? '' : ','}`)
  })

  let insertCoachValues = ''
  coachIs.forEach((val, idx, arr) => {
    return (insertCoachValues +=
      `('${val.userMail}', (select id from new_course))` +
      `${idx === arr.length - 1 ? '' : ','}`)
  })

  const qstring = `
    with new_course as (
           insert into course_t (title, timeslot, weekday, coursetype, duration, weeks, max, content, startday, fee, timeidx)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::integer[])
           returning *
         ),
         new_table as ( insert into table_t (timeidx, tabledate, tableid) values ${insertTableValues} returning * ),
         new_use_table as (
           insert into course_use_table_t (course_id, usedtableid, tabledate, timeidx)
           select nc.id, nt.tableid, nt.tabledate, nt.timeidx
           from
             new_course nc
             join new_table nt on nt.timeidx = any(nc.timeidx)
           returning *
         ),
         new_coach as ( insert into coachis_t (user_mail, course_id) values ${insertCoachValues} returning * )
    select id from new_course
  `

  let res
  try {
    // prettier-ignore
    res = await query(qstring, [
      newcourse.title, newcourse.timeSlot, newcourse.weekday, newcourse.courseType, newcourse.duration,
      newcourse.weeks, newcourse.max, newcourse.content, newcourse.startDay, newcourse.fee, newcourse.timeIdx
    ])
  } catch (err) {
    return { error: err }
  }

  if (!res) return { error: 'course not created' }
  if (res.rowCount === 0) return { error: 'course not created' }
  return { id: res.rows[0].id }
}
