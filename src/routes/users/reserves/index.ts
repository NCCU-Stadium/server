import express from 'express'
import { jwtProtect } from '../../middleware'
import {
  TableType,
  getReservations,
  getById,
} from '../../../database/reserves/get'
import {
  ReservationType,
  newReservation,
} from '../../../database/reserves/post'
import { cancelReservation } from '../../../database/reserves/delete'

const router = express.Router()
router.get('/all', async (req, res) => {
  const { date, tableid, timeidx } = req.query
  const table: TableType = {
    date: date as string,
    tableid: tableid as string,
    timeidx: timeidx as string,
  }
  const result = await getReservations(table)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json(result.arr)
})

router.get('/', jwtProtect, async (req, res) => {
  const mail = req.body.decoded.mail
  const result = await getById(mail)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json(result.arr)
})

router.post('/', jwtProtect, async (req, res) => {
  const mail = req.body.decoded.mail
  const { date, tableid, timeidx } = req.query

  const reserve: ReservationType = {
    user_mail: mail,
    usedtableid: tableid as string,
    tabledate: date as string,
    timeidx: timeidx as string,
  }

  const result = await newReservation(reserve)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).send(result)
})

router.delete('/', jwtProtect, async (req, res) => {
  const mail = req.body.decoded.mail
  const { date, tableid, timeidx } = req.query

  const reserve: ReservationType = {
    user_mail: mail,
    usedtableid: tableid as string,
    tabledate: date as string,
    timeidx: timeidx as string,
  }

  const result = await cancelReservation(reserve)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).send(result)
})
export default router
