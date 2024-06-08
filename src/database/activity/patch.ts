import { query } from '../database'
import { NewActivityType } from './post'

export async function updateActivity(id: string, activity: NewActivityType) {
  const qstring =
    'update activity_t set title=$1, content=$2 where id = $3 returning *'
  const res = await query(qstring, [
    activity.title,
    activity.content,
    id
  ])
  if (res.rowCount === 0) {
    return { error: 'user not created' }
  }
  return {
    title: res.rows[0].title,
    content: res.rows[0].content,
  }
}
