import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: '',            
  database: 'escuela',     
  connectionLimit: 5       
});

// Como se va a utilizar Docker, cuando se inicia el contenedor de MySQL este tarda un poco, 
// por ende siempre va a fallar si probamos aca si funciona o no el pool, asi que no hace falta
// probarlo.

export default pool;
