import mysql from 'mysql2/promise'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escuela',
    connectionLimit: 3
})

pool.getConnection()
.then(connection => {
    console.log('Conexion exitosa')
    connection.release()
})
.catch(error => {
    console.log('Error de conexion')
})

export default pool