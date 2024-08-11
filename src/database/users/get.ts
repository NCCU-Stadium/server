import { query } from '../database'

export async function getUser(mail: string) {
  const qstring = 'select * from user_t where mail = $1'
  const res = await query(qstring, [mail])
  if (res.rowCount === 0) {
    return { error: 'user not found' }
  }
  return {
    mail: res.rows[0].mail,
    pass: res.rows[0].pass,
    role: res.rows[0].role,
  }
}

export async function hasSubuser(mail: string, name: string): Promise<boolean> {
  const qstring = 'select * from subuser_t where user_mail = $1 and name = $2'
  const res = await query(qstring, [mail, name])
  if (res.rowCount == 0) {
    return false
  }
  return true
}
export async function getSubuser(mail: string) {
  const qstring = 'select name, avatar from subuser_t where user_mail = $1'
  const res = await query(qstring, [mail])
  if (res.rowCount === 0) {
    return { error: 'subUser not found' }
  }
  return { arr: res.rows }

  // return {
  //   mail: res.rows[0].mail,
  //   pass: res.rows[0].pass,
  //   role: res.rows[0].role,
  // }
}

export async function getSubuserInfo(mail: string, name: string) {
  const qstring = 'select * from subuser_t where user_mail = $1 and name = $2'
  const res = await query(qstring, [mail, name])
  if (res.rowCount === 0) {
    return { error: 'subUser not found' }
  }
  return { arr: res.rows }

  // return {
  //   mail: res.rows[0].mail,
  //   pass: res.rows[0].pass,
  //   role: res.rows[0].role,
  // }
}
