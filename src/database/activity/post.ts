import { query } from '../database'

export type NewActivityType = {
  title: string
  content: string
}

export async function createActivity(newActivity: NewActivityType) {
  const qstring =
    'insert into activity_t (title, content) values ($1, $2) returning *'
  const res = await query(qstring, [newActivity.title, newActivity.content])
  if (res.rowCount === 0) {
    return { error: 'activity not created' }
  }
  return {
    title: res.rows[0].title,
    content: res.rows[0].content,
  }
}
