// Importar la librería mysql2 con soporte para promesas
import mysql from 'mysql2/promise';

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',       // Servidor de MySQL
  user: 'root',            // Usuario (cambiá si usás otro)
  password: '',            // Contraseña (si tu MySQL tiene)
  database: 'escuela',     // Nombre de la base de datos
  connectionLimit: 5       // Límite de conexiones simultáneas
});

// Probar la conexión
try {
  const connection = await pool.getConnection();
  console.log('Conexión exitosa a la base de datos');
  connection.release(); // Liberar la conexión
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

// Exportar el pool para usarlo en otros módulos
export default pool;
