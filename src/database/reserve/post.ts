import { query } from '../database'

export type ReservationType = {
  user_mail: string
  usedtableid: string
  tabledate: string
  timeidx: string
}
export async function createUser(reserve: ReservationType) {
  const qstring =
    'insert into user_reserve_table_t (user_mail, usedtableid, tabledate, timeidx) values ($1, $2, $3, $4) returning *'
  const res = await query(qstring, [
    reserve.user_mail,
    reserve.usedtableid,
    reserve.tabledate,
    reserve.timeidx,
  ])
  if (res.rowCount === 0) {
    return { error: 'reserve failed' }
  }
  return {
    user_mail: res.rows[0].user_mail,
    usedtableid: res.rows[0].usedtableid,
    tabledate: res.rows[0].tabledate,
    timeidx: res.rows[0].timeidx,
  }
}
