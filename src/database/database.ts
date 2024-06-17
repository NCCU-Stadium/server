import { Pool, PoolClient, QueryResultRow } from 'pg'
import { env } from '../constants'

declare module 'pg' {
  interface PoolClient {
    lastQuery?: any[]
    query: (...args: any[]) => Promise<QueryResult<any>>
    release: (err?: boolean | Error | undefined) => void
  }
}

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export async function query<
  R extends QueryResultRow = any,
  I extends any[] | undefined = any[]
>(text: string, params: I) {
  const start = Date.now()
  console.log('executing query', { text })
  const res = await pool.query<R>(text, params);
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}

export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect()
  const query = client.query
  const release = client.release

  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    )
  }, 5000)

  // monkey patch the query method to keep track of the last query executed
  client.query = (...args: any[]) => {
    client.lastQuery = args
    return query.apply(client, args)
  }
  const originalRelease = client.release
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout)
    // set the methods back to their original functions
    client.query = query
    client.release = originalRelease
    return release.apply(client)
  }
  return client
}
