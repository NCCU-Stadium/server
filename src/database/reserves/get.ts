import { query } from '../database'

export type TableType = {
  date: string
  tableid?: string
  timeidx?: string
}
export async function getReservations(table: TableType) {
  let qstring = 'SELECT * FROM table_t WHERE tabledate = $1'
  const params: string[] = [table.date] // Initialized condition array with date
  const conditions: string[] = []

  if (table.tableid) {
    conditions.push(`tableid = $${params.length + 1}`)
    params.push(table.tableid)
  }
  if (table.timeidx) {
    conditions.push(`timeidx = $${params.length + 1}`)
    params.push(table.timeidx)
  }

  // Concatenate conditions
  if (conditions.length > 0) {
    qstring += ' AND ' + conditions.join(' AND ')
  }

  let res
  try {
    res = await query(qstring, params)
  } catch (err) {
    return { error: 'query error' }
  }

  if (res.rowCount === 0) {
    return { arr: [] }
  }
  return { arr: res.rows }
}

export async function getById(mail: string) {
  const qstring = 'select * from user_reserve_table_t where user_mail = $1'
  const res = await query(qstring, [mail])
  if (res.rowCount === 0) {
    return { error: 'reservation not found' }
  }
  return { arr: res.rows }
}
