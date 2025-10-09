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

// CRUD Alumnos

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

// Se envia mediante el body los campos Nombre (obligatorio)
// y apellido (opcional) y se busca en la base de datos y se
// devuelven los resultados.
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
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.get('/alumnos/:id', async (req, res) => {
    const consulta = 'SELECT * FROM alumnos WHERE id_alum = ?'
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, id)
        conexion.release()
        respuesta[0] ? res.json(respuesta[0]) : res.send("El alumno no existe")
    } catch {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.post('/alumnos', async (req, res) => {
    const consulta = 'INSERT INTO alumnos SET ?'
    const alumno = req.body
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [alumno]) 
        conexion.release()
        res.send("Alumno agregado satisfactoriamente")
    } catch (error) {
        res.status(500).send("Error al realizar la consulta.")
    }
})

app.put('/alumnos/:id', async (req, res) => {
    const consulta = 'UPDATE alumnos SET ? WHERE id_alum = ?'
    const alumno = req.body
    const id = req.params.id

    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [alumno, id])
        conexion.release()
        res.send("Alumno modificado satisfactoriamente")
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.delete('/alumnos', async (req, res) => {
    const consulta = 'DELETE * FROM alumnos WHERE id_alum = ?'
    try {
        const conexion = await pool.getConnection()
        const id = req.params.id
        conexion.release()
        res.send("Alumno eliminado satisfactoriamente")
    } catch (error) {
        res.status(500).send("Error al realizar la consulta")
    }
})

app.listen(puerto, () => {
    console.log(`Aplicacion escuchando en http://localhost:${puerto}`)
})