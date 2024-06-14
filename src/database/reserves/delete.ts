import { query } from '../database'
import { ReservationType } from './post'
export async function cancelReservation(table: ReservationType) {
  // 检查是否存在要删除的记录
  const checkQuery = `
    SELECT * FROM user_reserve_table_t
    WHERE user_mail = $1 AND usedtableid = $2 AND tabledate = $3 AND timeidx = $4
  `
  const checkParams = [
    table.user_mail,
    table.usedtableid,
    table.tabledate,
    table.timeidx,
  ]
  const checkRes = await query(checkQuery, checkParams)

  // 如果没有找到相应的记录，返回错误信息
  if (checkRes.rowCount === 0) {
    return { error: 'No reservation found to cancel' }
  }

  // 开始事务处理
  try {
    await query('BEGIN', [])

    // 从 user_reserve_table_t 表中删除记录
    const deleteUserReserveQuery = `
      DELETE FROM user_reserve_table_t
      WHERE user_mail = $1 AND usedtableid = $2 AND tabledate = $3 AND timeidx = $4
      RETURNING *
    `
    const deleteUserReserveParams = checkParams
    const deleteUserReserveRes = await query(
      deleteUserReserveQuery,
      deleteUserReserveParams
    )

    // 检查是否成功删除
    if (deleteUserReserveRes.rowCount === 0) {
      await query('ROLLBACK', [])
      return { error: 'Failed to delete reservation from user_reserve_table_t' }
    }

    // 从 table_t 表中删除记录
    const deleteTableQuery = `
      DELETE FROM table_t
      WHERE tableid = $1 AND tabledate = $2 AND timeidx = $3
      RETURNING *
    `
    const deleteTableParams = [
      table.usedtableid,
      table.tabledate,
      table.timeidx,
    ]
    const deleteTableRes = await query(deleteTableQuery, deleteTableParams)

    // 检查是否成功删除
    if (deleteTableRes.rowCount === 0) {
      await query('ROLLBACK', [])
      return { error: 'Failed to delete reservation from table_t' }
    }

    // 提交事务
    await query('COMMIT', [])

    return {
      message: 'Reservation cancelled successfully',
      cancelled: {
        user_mail: deleteUserReserveRes.rows[0].user_mail,
        usedtableid: deleteUserReserveRes.rows[0].usedtableid,
        tabledate: deleteUserReserveRes.rows[0].tabledate,
        timeidx: deleteUserReserveRes.rows[0].timeidx,
      },
    }
  } catch (error) {
    await query('ROLLBACK', [])
    return { error: 'Transaction failed', details: error }
  }
}
