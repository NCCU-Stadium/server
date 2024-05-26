import { query } from '../database'

export type NewUserType = {
  mail: string
  role: 'admin' | 'user' | 'coach'
  phone: string
  pass: string
}
export async function createUser(newuser: NewUserType) {
  const qstring =
    'insert into user_t (mail, role, phone, pass) values ($1, $2, $3, $4) returning *'
  const res = await query(qstring, [
    newuser.mail,
    newuser.role,
    newuser.phone,
    newuser.pass,
  ])
  if (res.rowCount === 0) {
    return { error: 'user not created' }
  }
  return {
    mail: res.rows[0].mail,
    role: res.rows[0].role,
    phone: res.rows[0].phone,
  }
}
