import express, { Request, Response } from 'express'

const app = express()
const port = 8080

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
