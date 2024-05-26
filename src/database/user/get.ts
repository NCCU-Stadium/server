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
