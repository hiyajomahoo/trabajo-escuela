import express from "express"
import pool from "./modulos/conexion_sql.js"
import autenticacion, {verificarUsuario} from "./modulos/autenticacion.js"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
const puerto = 3000

app.use(express.json())

// Autenticacion
app.use(cors({
    origin: [
        'http://localhost',
        'http://localhost:80', 
        'http://127.0.0.1',
        'http://127.0.0.1:80',
        'http://127.0.0.1:5500'
    ],
    credentials: true
}))
app.use('/usuarios', autenticacion)
app.use(cookieParser())
app.use(verificarUsuario)

/* 
    GET /alumnos/
    Descripcion:
        - Permite obtener a todos los alumnos de la base de datos.
    Respuestas:
        - 200 OK: Devuelve la tabla alumnos
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/

app.get('/alumnos', async (req, res) => {
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query("SELECT alumnos.id_alum, alumnos.dni, alumnos.nombre_alum, alumnos.apellido_alum, cursos.anio, cursos.division, especialidades.nombre_especialidad, alumnos.id_curso FROM alumnos JOIN cursos ON alumnos.id_curso = cursos.id_curso JOIN especialidades ON cursos.id_especialidad = especialidades.id_especialidad")
        conexion.release()
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error al realizar la consulta.")
    }
})

/* 
    GET /cursos/
    Descripcion:
        - Permite obtener a todos los alumnos de la base de datos.
    Respuestas:
        - 200 OK: Devuelve la tabla de cursos
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/

app.get('/cursos', async (req, res) => {
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query("SELECT cursos.id_curso, cursos.anio, cursos.division, especialidades.nombre_especialidad, turnos.descripcion_turno FROM cursos JOIN especialidades ON cursos.id_especialidad = especialidades.id_especialidad JOIN turnos ON cursos.id_turno = turnos.id_turno")        
        conexion.release()
        res.json(respuesta)
    } catch (error) {
        res.status(500).json({message:"Error al realizar la consulta."})
    }
})

/* 
    POST /alumnos/buscarNombre
    Descripcion:
        - Permite buscar a uno o varios alumnos segun el nombre y apellido ingresado
    Cuerpo (body): 
        - nombre (requerido)
        - apellido
    Respuestas:
        - 200 OK: Devuelve id, dni, nombre, apellido y curso del alumno.
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/
app.post('/alumnos/buscarNombre/', async (req, res) => {
    if (!req.body) return res.status(400).send("Parametros insuficientes.")
    let {nombre, apellido} = req.body
    nombre = nombre + '%'
    if (apellido != undefined) apellido = '%' + apellido + '%'

    const consulta = `SELECT alumnos.id_alum, alumnos.dni, alumnos.nombre_alum, alumnos.apellido_alum, cursos.anio, cursos.division, especialidades.nombre_especialidad FROM alumnos JOIN cursos ON alumnos.id_curso = cursos.id_curso JOIN especialidades ON cursos.id_especialidad = especialidades.id_especialidad WHERE nombre_alum LIKE ? ` + (apellido != undefined ? `AND apellido_alum LIKE ?` : ``)
    
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [nombre, apellido])
        conexion.release()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
        console.log(error)
    }
})

/* 
    GET /alumnos/:id
    Descripcion:
        - Permite buscar a un alumno segun su ID
    Parametros: 
        - id (obligatorio)
    Respuestas:
        - 200 OK: Devuelve el alumno pedido.
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 404 Not Found: El usuario pedido no existe.
        - 500 Internal server error: Hubo un error en la consulta o parametros insuficientes.
*/

app.get('/alumnos/:id', async (req, res) => {
    const consulta = 'SELECT id_alum, dni, nombre_alum, apellido_alum, cursos.anio, cursos.division, especialidades.nombre_especialidad, grupo, telefono, direccion, contactos_emergencia, observaciones, alumnos.id_curso FROM alumnos JOIN cursos ON alumnos.id_curso = cursos.id_curso JOIN especialidades ON cursos.id_especialidad = especialidades.id_especialidad WHERE id_alum = ?'
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, id)
        conexion.release()
        respuesta[0] ? res.status(200).json(respuesta[0]) : res.status(404).send("El alumno no existe")
    } catch(error) {
        res.status(500).send("Error al realizar la consulta")
        console.log(error)
    }
})

/* 
    POST /alumnos/
    Descripcion:
        - Permite crear un alumno en la base de datos
    Cuerpo (body): 
        - dni
        - nombre
        - apellido
        - id_curso
        - grupo
        - telefono
        - direccion
        - contactos_emergencia
        - observaciones
    Respuestas:
        - 201 Created: El alumno es creado satisfactoriamente
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/

app.post('/alumnos', async (req, res) => {
    const consulta = 'INSERT INTO alumnos SET ?'
    const alumno = req.body
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [alumno]) 
        conexion.release()
        res.status(201).send("Alumno agregado satisfactoriamente")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al realizar la consulta.")
    }
})

/* 
    PUT /alumnos/:id
    Descripcion:
        - Permite modificar a un alumno de la base de datos
    Cuerpo (body): 
        - dni
        - nombre
        - apellido
        - id_curso
        - grupo
        - telefono
        - direccion
        - contactos_emergencia
        - observaciones
    Parametros:
        - id (obligatorio)
    Respuestas:
        - 200 OK: El alumno es modificado satisfactoriamente
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta o parametros insuficientes.
*/

app.put('/alumnos/:id', async (req, res) => {
    const consulta = 'UPDATE alumnos SET ? WHERE id_alum = ?'
    const alumno = req.body
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [alumno, id])
        conexion.release()
        res.status(200).send("Alumno modificado satisfactoriamente")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al realizar la consulta")
    }
})

/* 
    DELETE /alumnos/
    Descripcion:
        - Permite eliminar a un alumno de la base de datos
    Parametros:
        - id (obligatorio)
    Respuestas:
        - 200 OK: El usuario es eliminado satisfactoriamente
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/

app.delete('/alumnos/:id', async (req, res) => {
    const consulta = 'DELETE FROM alumnos WHERE id_alum = ?'
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [id])
        conexion.release()
        res.send("Alumno eliminado satisfactoriamente")
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.listen(puerto, () => {
    console.log(`Aplicacion escuchando en http://localhost:${puerto}`)
})