import { query } from '../database'

export type NewAnnouncementType = {
  title: string
  content: string
}

export async function createAnnouncement(newAnnouncement: NewAnnouncementType) {
  const qstring =
    'insert into announcement_t (title, content) values ($1, $2) returning *'
  const res = await query(qstring, [newAnnouncement.title, newAnnouncement.content])
  if (res.rowCount === 0) {
    return { error: 'announcement not created' }
  }
  return {
    title: res.rows[0].title,
    content: res.rows[0].content,
  }
}
