import { query } from '../database'

export interface NewTableType {
  timeIdx: number
  tableDate: Date
  tableId: number
}

export async function createNewTable({
  timeIdx,
  tableDate,
  tableId,
}: NewTableType) {
  const qstring = `INSERT INTO "table_t" ("timeidx", "tabledate", "tableid") VALUES ($1, $2, $3) returning *`
  const res = await query(qstring, [timeIdx, tableDate, tableId])
  return res.rows[0] as NewTableType
}
