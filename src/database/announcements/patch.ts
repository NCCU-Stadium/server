import { query } from '../database'
import { NewAnnouncementType } from './post'

export async function updateAnnouncement(id: string, announcement: NewAnnouncementType) {
  const qstring =
    'update announcement_t set title=$1, content=$2 where id = $3 returning *'
  const res = await query(qstring, [announcement.title, announcement.content, id])
  if (res.rowCount === 0) {
    return { error: 'user not created' }
  }
  return {
    title: res.rows[0].title,
    content: res.rows[0].content,
  }
}
