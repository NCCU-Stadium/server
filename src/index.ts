import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 8080

app.get('/', (_req, res) => {
  res.send('Hello TypeScript with Express!')
})

import {
  authRouter,
  activitiesRouter,
  usersRouter,
  productsRouter,
  courseRouter,
  announcementsRouter,
} from './routes'
app.use('/auth', authRouter)
app.use('/activities', activitiesRouter)
app.use('/shops/products', productsRouter)
app.use('/users', usersRouter)
app.use('/courses', courseRouter)
app.use('/announcements', announcementsRouter)

import { errorHandler } from './routes/middleware'
app.use(errorHandler)

app.listen(8080, () => {
  console.log(`Server is running on port ${port}`)
})
