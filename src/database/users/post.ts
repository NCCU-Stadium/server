import { query } from '../database'

export type NewUserType = {
  mail: string
  role: 'admin' | 'user' | 'coach'
  phone: string
  pass: string
  // subuser props
  name: string
  avatar?: string
  gender?: string
  birth?: string
}
export async function createUser(newuser: NewUserType) {
  const { mail, role, phone, pass, name } = newuser
  const { avatar, gender, birth } = newuser
  const qstring = `
    with newuser as ( insert into user_t (mail, role, phone, pass) values ($1, $2, $3, $4) returning mail )
    insert into subuser_t (user_mail, name, avatar, gender, birth) values ($1, $5::varchar, $6::varchar, $7, $8::date) returning *;
  `
  let res
  try {
    // prettier-ignore
    res = await query(qstring, 
      [mail, role, phone, pass, name, avatar, gender, birth]
    )
  } catch (err) {
    return { error: err }
  }
  if (!res || !res.rowCount) return { error: 'user not created' }
  if (res.rowCount === 0) return { error: 'user not created' }
  return {
    mail: res.rows[0].user_mail,
  }
}

export type SubUserType = {
  email: string
  username: string
  avatar?: string
  gender: string
  birth: string
}
export async function createSubuser(props: SubUserType) {
  const { email, username, avatar, gender, birth } = props
  const qstring = `insert into subuser_t (user_mail, avatar, name, gender, birth) values ($1, $2, $3, $4, $5) returning name`
  let res
  try {
    res = await query(qstring, [email, avatar, username, gender, birth])
  } catch (err) {
    return { error: err }
  }
  if (!res || !res.rowCount) {
    return { error: 'subuser not created' }
  }
  if (res.rowCount === 0) {
    return { error: 'subuser not created' }
  }
  return res.rows[0].name
}

export type UnpaidQueryType = {
  email: string
  amount: number
  operation: 'add' | 'sub'
}
export async function changeUnpaid(props: UnpaidQueryType) {
  const { email, amount, operation } = props
  const operator = operation === 'add' ? '+' : '-'
  const qstring = `update user_t set unpaid = unpaid ${operator} $1 where mail = $2 returning unpaid, mail`
  let res
  try {
    res = await query(qstring, [amount, email])
  } catch (err) {
    return { error: err }
  }
  if (!res || !res.rowCount) return { error: 'unpaid not changed' }
  if (res.rowCount === 0) return { error: 'unpaid not changed' }

  return { unpaid: res.rows[0].unpaid, mail: res.rows[0].mail }
}

export type PointQueryType = {
  email: string
  amount: number
  operation: 'add' | 'sub'
}
export async function changePoint(props: UnpaidQueryType) {
  const { email, amount, operation } = props
  const operator = operation === 'add' ? '+' : '-'
  const qstring = `update user_t set point = point ${operator} $1 where mail = $2 returning point, mail`
  let res
  try {
    res = await query(qstring, [amount, email])
  } catch (err) {
    return { error: err }
  }
  if (!res || !res.rowCount) return { error: 'point not changed' }
  if (res.rowCount === 0) return { error: 'point not changed' }

  return { point: res.rows[0].point, mail: res.rows[0].mail }
}
