import { query } from '../database'

export async function deleteSubuser(email: string, username: string) {
  const qstring = `delete from subuser_t where user_mail = $1 and name = $2`
  const res = await query(qstring, [email, username])
  if (res.rowCount === 0) {
    return { error: 'subuser not deleted' }
  }
  return { message: 'subuser deleted' }
}
