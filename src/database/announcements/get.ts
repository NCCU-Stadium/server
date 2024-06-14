import { query } from '../database'

export type TimeRangeType = {
  start?: string
  end?: string
}

export async function getAnnouncementList(time: TimeRangeType) {
  let qstring = 'select * from announcement_t where true'
  let params: string[] = []
  if (time.start) {
    qstring += ' and time >= $1'
    params.push(time.start)
    if (time.end) {
      qstring += ' and time <= $2'
      params.push(time.end)
    }
  } else if (time.end) {
    qstring += ' and time <= $1'
    params.push(time.end)
  }
  console.log(params)
  const res = await query(qstring, params)
  if (res.rowCount === 0) {
    return { error: 'no announcement in the given period' }
  }
  return { arr: res.rows }
}

export async function getAnnouncement(id: string) {
  const qstring = 'select * from announcement_t where id = $1'
  const res = await query(qstring, [id])
  if (res.rowCount === 0) {
    return { error: 'announcement not found' }
  }
  return {
    id: res.rows[0].id,
    title: res.rows[0].title,
    content: res.rows[0].content,
    time: res.rows[0].time,
  }
}
