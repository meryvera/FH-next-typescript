// import React from 'react'
import { NextApiRequest, NextApiResponse } from "next";
import { conexion } from "../../../utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse ) {
  console.log(req.method); // GET ó POST
  console.log(req.url); //  /api/tasks
  console.log(req.query); // {} -> no hay id
  console.log(req.body) // POST case -> { title: 'my first task', description: 'my first description' }
  
  const { method, body } = req;

  switch (method) {

    case "POST":
      try {
        const {title, description } = body;
        //await conexion.query('INSERT INTO') // conexion.query hace consulta asincrona a la bd usando sintaxis de sql (postgres)
          // insertare datos dentro de la tabla(abajo), antes debbo crear una tabla(desde consola CREATE TABLE...)
        const text = 'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
        const values = [title , description];
        
        const response = await conexion.query(text, values)
        console.log('L24 de api index:',response); // {id: ,title: ,description: ,created_on: }
        res.status(200).json(response.rows[0]);
        break;

      } catch (error: any) {
        return res.status(500).json({errorFail: error.message});
      }

      case "GET":
        try {
          const text = 'SELECT * FROM tasks';
          const response = await conexion.query(text);
          console.log(response); // {id: ,title: ,description: ,created_on: }
          /* forzando errores, osea para que aparezca este error personalizado en el catch */
          // throw new Error("something went wrong");
          
          res.status(200).json(response.rows);
          break;
  
        } catch (error: any) {
          return res.status(500).json({errorFail: error.message});
        } 
    
    default:
      res.status(400).json('Invalid method')
      break;
  }

}
