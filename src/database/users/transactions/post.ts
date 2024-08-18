import { query } from '../../database'

export type TransactionBuyPointsType = {
  mail: string
  unpaid: number
  point: number
  unpaidOp: 'add' | 'sub'
  pointsOp: 'add' | 'sub'
}
export async function buyPointsTrans(props: TransactionBuyPointsType) {
  const { mail, unpaid, point: points } = props
  const unpaidOperator = props.unpaidOp === 'add' ? '+' : '-'
  const pointsOperator = props.pointsOp === 'add' ? '+' : '-'
  const qstring = `
    update user_t set point = point ${pointsOperator} $2, unpaid = unpaid ${unpaidOperator} $3 where mail = $1 returning point, unpaid, mail
  `
  let res
  try {
    res = await query(qstring, [mail, unpaid, points])
  } catch (err) {
    return { error: err }
  }
  if (!res || !res.rowCount) return { error: 'point not changed' }
  if (res.rowCount === 0) return { error: 'point not changed' }

  return {
    point: res.rows[0].point,
    mail: res.rows[0].mail,
    unpaid: res.rows[0].unpaid,
  }
}
