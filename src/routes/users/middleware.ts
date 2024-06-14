import express from 'express'
import { hasSubuser } from '../../database/user/get'

export async function subuserCheck(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const subuserName = req.body.user_name
  const has = await hasSubuser(req.body.decoded.mail, subuserName)
  if (!has) {
    return res.status(401).send('No such subuser')
  }
  return next()
}
