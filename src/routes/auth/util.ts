import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../constants'

export function comparePassword(
  plainText: string | Buffer,
  encryptedText: string
) {
  return bcrypt.compareSync(plainText, encryptedText)
}

export function encryptPassword(plainText: string) {
  return bcrypt.hashSync(plainText, 10)
}

export function generateJWT(mail: string, role: string) {
  return 'Bearer ' + jwt.sign({ mail, role }, env.JWT_SECRET)
}
