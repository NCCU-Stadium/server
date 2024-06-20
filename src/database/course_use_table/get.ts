import { UUID } from 'crypto'
import { query } from '../database'
import { NewCourseUseTableType } from './post'
import { NewTableType } from '../table/post'

export type ExistCourseUseTableType = NewCourseUseTableType

export async function getCourseUseTables(courseId: UUID) {
  const qstring = 'select * from "course_use_table_t" where courseid = $1'
  const res = await query(qstring, [courseId])
  return res.rows.map(
    (use) =>
      ({
        courseId: use.courseid,
        usedTableId: use.usedtableid,
        tableDate: use.tabledate,
        timeIdx: use.timeidx,
      }) as ExistCourseUseTableType
  )
}

export async function getTablesFromCourseUseTable(courseId: UUID) {
  const qstring = `SELECT t.* FROM "course_use_table_t" AS u
    JOIN "table_t" AS t ON
      u.usedtableid = t.tableid AND
      u.tabledate = t.tabledate AND
      u.timeidx = t.timeidx
    WHERE u.courseid = $1`
  const res = await query(qstring, [courseId])
  return res.rows.map(
    (table) =>
      ({
        timeIdx: table.timeidx,
        tableDate: table.tabledate,
        tableId: table.tableid,
      }) as NewTableType
  )
}
