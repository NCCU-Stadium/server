import { query } from '../database'
export type ReservationType = {
  user_mail: string
  usedtableid: string
  tabledate: string
  timeidx: string
}
export async function newReservation(reserve: ReservationType) {
  // 查询 table_t 表，检查是否有重复记录
  const checkQuery = `
    SELECT * FROM table_t
    WHERE timeidx = $1 AND tabledate = $2 AND tableid = $3
  `
  const checkParams = [reserve.timeidx, reserve.tabledate, reserve.usedtableid]
  const checkRes = await query(checkQuery, checkParams)

  // 如果存在重复记录，返回错误信息
  if (checkRes.rowCount && checkRes.rowCount > 0) {
    return { error: 'duplicate reservation' }
  }

  // 如果没有重复，插入新记录到 table_t
  const insertTableQuery = `
    INSERT INTO table_t (timeidx, tabledate, tableid)
    VALUES ($1, $2, $3)
    RETURNING *
  `
  const insertTableParams = [
    reserve.timeidx,
    reserve.tabledate,
    reserve.usedtableid,
  ]
  const tableRes = await query(insertTableQuery, insertTableParams)

  // 如果插入 table_t 失败，返回错误信息
  if (tableRes.rowCount === 0) {
    return { error: 'failed to insert into table_t' }
  }

  // 插入新记录到 user_reserve_table_t
  const insertUserReserveQuery = `
    INSERT INTO user_reserve_table_t (user_mail, usedtableid, tabledate, timeidx)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
  const insertUserReserveParams = [
    reserve.user_mail,
    reserve.usedtableid,
    reserve.tabledate,
    reserve.timeidx,
  ]
  const userReserveRes = await query(
    insertUserReserveQuery,
    insertUserReserveParams
  )

  // 如果插入 user_reserve_table_t 失败，返回错误信息
  if (userReserveRes.rowCount === 0) {
    return { error: 'failed to insert into user_reserve_table_t' }
  }

  // 返回成功插入的记录
  return {
    message: 'reserved successfully',
    reserve: {
      user_mail: userReserveRes.rows[0].user_mail,
      usedtableid: userReserveRes.rows[0].usedtableid,
      tabledate: userReserveRes.rows[0].tabledate,
      timeidx: userReserveRes.rows[0].timeidx,
    },
  }
}
