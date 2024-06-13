import express from 'express'
import { jwtProtect } from '../../middleware'
import {
  TableType,
  getReservations,
  getById,
} from '../../../database/reserve/get'

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

export default router
