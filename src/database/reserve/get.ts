import { query } from '../database'

export type TableType = {
  date: string
  tableid?: string
  timeidx?: string
}
export async function getReservations(table: TableType) {
  // 初始查询字符串
  let qstring = 'SELECT * FROM table_t WHERE tabledate = $1'

  // 用于存储查询参数的数组，初始化时已经包含了 table.date
  const params: string[] = [table.date]

  // 用于构建查询条件的数组
  const conditions: string[] = []

  // 根据不同条件添加查询条件和参数
  if (table.tableid) {
    conditions.push(`tableid = $${params.length + 1}`)
    params.push(table.tableid)
  }
  if (table.timeidx) {
    conditions.push(`timeidx = $${params.length + 1}`)
    params.push(table.timeidx)
  }

  // 如果有额外的查询条件，添加到查询字符串中
  if (conditions.length > 0) {
    qstring += ' AND ' + conditions.join(' AND ')
  }

  console.log('Query String:', qstring)
  console.log('Params:', params)

  // 执行查询
  const res = await query(qstring, params)
  if (res.rowCount === 0) {
    return { error: 'no reservations in the given period' }
  }
  return { arr: res.rows }
}

// export async function getReservations(table: TableType) {
//   let qstring = 'select * from table_t where tabledate = $1'
//   let params: string[] = []
//   // let date: Date = new Date(table.date)
//   params.push(table.date)
//   if (table.tableid) {
//     qstring += ' and tableid = $2'
//     params.push(table.tableid)
//   } else if (table.timeidx) {
//     qstring += ' and timeidx = $3'
//     params.push(table.timeidx)
//   }
//   console.log(params)
//   const res = await query(qstring, params)
//   if (res.rowCount === 0) {
//     return { error: 'no reservations in the given period' }
//   }
//   return { arr: res.rows }
// }

export async function getById(mail: string) {
  const qstring = 'select * from user_reserve_table_t where user_mail = $1'
  const res = await query(qstring, [mail])
  if (res.rowCount === 0) {
    return { error: 'reservation not found' }
  }
  return { arr: res.rows }
  // return {
  //   user_mail: res.rows[0].user_mail,
  //   usedtableid: res.rows[0].usedtableid,
  //   tabledate: res.rows[0].tabledate,
  //   timeidx: res.rows[0].timeidx,
  // }
}
