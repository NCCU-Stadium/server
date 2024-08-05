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
