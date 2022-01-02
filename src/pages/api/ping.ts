// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {conexion} from '../../utils/database'

type Data = {
  time: string,
  message: string
}

export default async function hello(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'John Doe' })
  
  const response = await conexion.query('SELECT NOW()'); 

  return res.json({message:'comprueba si hay o no conexion al servidor desde la base de datos', time: response.rows[0].now})
}

//El nombre ping es el que comunmente se le da al file que comprueba si hay o no conexion al servidor desde la base de datos