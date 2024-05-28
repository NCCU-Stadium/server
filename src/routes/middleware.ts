import jwt from 'jsonwebtoken'
import express from 'express'
import { env } from '../constants'

export function jwtProtect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send('No token provided')
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, env.JWT_SECRET as string, (err, user) => {
    if (!err) {
      req.body.decoded = user
      return next()
    }
    if (err.name === 'TokenExpiredError') {
      return res.send(401).send('Token expired')
    }
    if (err) {
      return res.status(403).send('Invalid token')
    }
    return
  })
}
