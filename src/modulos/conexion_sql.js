import { configDotenv } from 'dotenv';
import mysql from 'mysql2/promise';
configDotenv()

const pool = mysql.createPool({
  host: process.env.DB_HOST,       
  user: 'root',            
  password: process.env.DB_PASSWORD,            
  database: process.env.DB_NAME,     
  connectionLimit: 5       
});

// Como se va a utilizar Docker, cuando se inicia el contenedor de MySQL este tarda un poco, 
// por ende siempre va a fallar si probamos aca si funciona o no el pool, asi que no hace falta
// probarlo.

export default pool;
