import { query } from '../database'
import { NewTableType } from './post'

export type DeleteTableType = NewTableType

export async function deleteTable({
  timeIdx,
  tableDate,
  tableId,
}: DeleteTableType) {
  const qstring = `DELETE FROM "table_t" WHERE "timeidx" = $1 AND "tabledate" = $2 AND "tableid" = $3`
  const res = await query(qstring, [timeIdx, tableDate, tableId])
  return res.rowCount === 1
}
