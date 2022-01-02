/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conexion } from "../../../utils/database";
//import { conexion } from "src/utils/database"; no funcionaaa =( 

export default async (req: NextApiRequest, res: NextApiResponse ) => {
  console.log(req.query); // { id:'10' }
  console.log(req.method) // GET ó PUT ó DELETE
  console.log(req.url); // /api/tasks/10

  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const text = 'SELECT * FROM tasks WHERE id = $1';
        const values = [query.id]
        const response = await conexion.query(text, values);

        if(response.rows.length === 0 ) res.status(404).json({message:'Tasks not found =('});

        res.json(response.rows[0]);
        break;

      } catch (error: any) {
        return res.status(500).json({errorFail: error.message});
      }

    case 'PUT':
      try {
        const { title, description } = body;
        const text = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
        const values = [title, description, query.id]
        const response = await conexion.query(text, values);

        if(response.rows.length === 0 ) res.status(404).json({message:'Tasks not found =('});

        res.json(response.rows[0]);
        break;

      } catch (error: any) {
        return res.status(500).json({errorFail: error.message});
      }

    case 'DELETE':
      try {
        const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const values = [query.id]
        const response = await conexion.query(text, values);
        console.log(response);

        if(response.rowCount  === 0 ) res.status(404).json({message:'Tasks not found =('});

        res.json(response.rows[0]);
        break;

      } catch (error: any) {
        return res.status(500).json({errorFail: error.message});
      }

    default:
      res.status(400).json('method not allowed')
      break;
  }

    
}