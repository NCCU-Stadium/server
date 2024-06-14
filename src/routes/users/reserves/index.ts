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
router.get('/', async (req, res) => {
  const date = req.query.date as string
  const tableid = req.query.tableid as string
  const timeidx = req.query.timeidx as string
  const table: TableType = {
    date: date,
    tableid: tableid,
    timeidx: timeidx,
  }
  const result = await getReservations(table)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json(result.arr)
})

router.get('/:mail', async (req, res) => {
  const mail = req.params.mail
  console.log(req.params.mail)
  const result = await getById(mail)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json(result.arr)
})

router.post('/', async (req, res) => {
  //const mail = req.body.decoded.mail
  const mail = req.body.mail
  const date = req.body.date as string
  const tableid = req.body.tableid as string
  const timeidx = req.body.timeidx as string

  const reserve: ReservationType = {
    user_mail: mail,
    usedtableid: tableid,
    tabledate: date,
    timeidx: timeidx,
  }

  // const mail = req.params.mail
  // console.log(req.params.mail)
  const result = await newReservation(reserve)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json({
    user_mail: result.user_mail,
    usedtableid: result.usedtableid,
    tabledate: result.tabledate,
    timeidx: result.timeidx,
  })
})

router.delete('/', async (req, res) => {
  const mail = req.body.mail
  const date = req.body.date as string
  const tableid = req.body.tableid as string
  const timeidx = req.body.timeidx as string

  const reserve: ReservationType = {
    user_mail: mail,
    usedtableid: tableid,
    tabledate: date,
    timeidx: timeidx,
  }

  // const mail = req.params.mail
  // console.log(req.params.mail)
  const result = await cancelReservation(reserve)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json({
    user_mail: result.cancelled?.user_mail,
    usedtableid: result.cancelled?.usedtableid,
    tabledate: result.cancelled?.tabledate,
    timeidx: result.cancelled?.timeidx,
  })
})
export default router
