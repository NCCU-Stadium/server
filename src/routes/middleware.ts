import jwt from 'jsonwebtoken'
import express from 'express'
import { env } from '../constants'
import { ErrorRequestHandler } from 'express'

export type DecodedType = {
  mail: string
  role: string
  iat: number
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
}

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
      req.body.decoded = user as DecodedType
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

export function adminProtect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const decoded = req.body.decoded
  if (!decoded || !decoded.role) {
    return res.status(403).send('Only admin can access')
  }
  if (decoded.role !== 'admin') {
    return res.status(403).send('Only admin can access')
  }
  return next()
}
