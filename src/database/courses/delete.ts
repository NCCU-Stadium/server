import { UUID } from 'crypto'
import { query } from '../database'
import { getTablesFromCourseUseTable } from '../course_use_table/get'

export async function deleteCourseSingleTransaction(id: UUID) {
  const tables = await getTablesFromCourseUseTable(id)
  let deleteTableValues = ''
  tables.forEach((table, idx, arr) => {
    const tabledateString = table.tableDate.toLocaleDateString('fr-CA')
    return (deleteTableValues += `(tabledate='${tabledateString}' and timeidx=${table.timeIdx} and tableid=${table.tableId})${idx === arr.length - 1 ? '' : ' or '}`)
  })
  const qstring = `
    with delete_use_table as ( delete from course_use_table_t where course_id = $1 returning * ),
         delete_table as (
           delete from table_t where ${deleteTableValues} returning tableid
         ),
         delete_coach_is as ( delete from coachis_t where course_id = $1 returning course_id )
    delete from course_t where id = $1 returning *
  `
  // console.log(qstring)
  // return { error: 'not implemented' }

  let res
  try {
    res = await query(qstring, [id])
  } catch (err) {
    console.log(err)
    return { error: err }
  }
  if (!res) return { error: 'course not deleted' }
  if (res.rowCount === 0) return { error: 'course not deleted' }
  console.log('Success')
  console.log(res)
  return { id: res.rows[0].id }
}
