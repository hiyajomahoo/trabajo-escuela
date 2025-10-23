import express from "express"
import pool from "./modulos/conexion_sql.js"
import autenticacion, {verificarUsuario} from "./modulos/autenticacion.js"
import cors from "cors"
const app = express()
const puerto = 3000

app.use(express.json())

// Autenticacion
app.use(cors())
app.use('/usuarios', autenticacion)
/* app.use(verificarUsuario) */

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
        const [respuesta] = await conexion.query("SELECT * FROM alumnos")
        conexion.release()
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error al realizar la consulta.")
    }
})

/* 
    GET /alumnos/buscarNombre
    Descripcion:
        - Permite buscar a uno o varios alumnos segun el nombre y apellido ingresado
    Cuerpo (body): 
        - nombre (requerido)
        - apellido
    Respuestas:
        - 200 OK: Devuelve la lista de alumnos que coincide el nombre y/o apellido
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/
app.get('/alumnos/buscarNombre/', async (req, res) => {
    if (!req.body) return res.status(400).send("Parametros insuficientes.")
    let {nombre, apellido} = req.body
    nombre = '%' + nombre + '%'
    if (apellido != undefined) apellido = '%' + apellido + '%'

    const consulta = `SELECT * FROM alumnos WHERE nombre_alum LIKE ? ` + (apellido != undefined ? `AND apellido_alum LIKE ?` : ``)
    
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [nombre, apellido])
        conexion.release()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
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
        - 500 Internal server error: Hubo un error en la consulta
*/

app.get('/alumnos/:id', async (req, res) => {
    const consulta = 'SELECT * FROM alumnos WHERE id_alum = ?'
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, id)
        conexion.release()
        respuesta[0] ? res.status(200).json(respuesta[0]) : res.status(404).send("El alumno no existe")
    } catch {
        res.status(500).send("Error al realizar la consulta")
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
        - 500 Internal server error: Hubo un error en la consulta
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
    const consulta = 'DELETE * FROM alumnos WHERE id_alum = ?'
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        conexion.release()
        res.send("Alumno eliminado satisfactoriamente")
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.listen(puerto, () => {
    console.log(`Aplicacion escuchando en http://localhost:${puerto}`)
})