import { UUID } from 'crypto';
import { query } from '../database';

export type NewCourseUseTableType = {
  courseId: UUID,
  usedTableId: number,
  tableDate: Date,
  timeIdx: number,
};

export async function createCourseUseTable(newCourseUseTable: NewCourseUseTableType) {
  const qstring =
    'insert into "course_use_table_t" (courseid, usedtableid, tabledate, timeidx) values ($1, $2, $3, $4) returning *';
  const res = await query(qstring, [
    newCourseUseTable.courseId,
    newCourseUseTable.usedTableId,
    newCourseUseTable.tableDate,
    newCourseUseTable.timeIdx,
  ]);
  if (res.rowCount === 0) {
    return { error: 'course use table not created' };
  }
  return {
    courseId: res.rows[0].courseid,
    usedTableId: res.rows[0].usedtableid,
    tableDate: res.rows[0].tabledate,
    timeIdx: res.rows[0].timeidx,
  } as NewCourseUseTableType;
}
