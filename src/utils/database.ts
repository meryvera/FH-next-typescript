import { Pool } from 'pg';

let conexion: any;

if(!conexion){
  conexion = new Pool({
    user: 'postgres',
    password: 'ndakever',
    host: 'localhost',
    port: 5432,
    database: 'tasksdb'
  });
}

export { conexion };
