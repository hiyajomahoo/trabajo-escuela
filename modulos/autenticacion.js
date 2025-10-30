import pool from './conexion_sql.js'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
configDotenv()

const router = express.Router()

router.use(express.json())
router.use(cookieParser())

/* Se verifica que la peticion este acompañada de un token valido */
export function verificarUsuario(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(403).send("No autorizado!")
    
    try {
        const data = jwt.verify(token, process.env.SECRETO_JWT)
        req.usuario = data;
        next()
    } catch (error) {
        return res.status(401).send("Token invalido");
    }
}

/* 
    Si el usuario tiene un token correcto, devuelve el codigo 200 OK,
    indicandole al navegador que el usuario tiene permiso para acceder
    a la pagina que lo requiere.
*/
router.post('/autenticar', verificarUsuario, (req, res) => {
    res.send(200)
})

/* 
    POST /usuarios/iniciarSesion
    Descripcion:
        - Permite iniciar sesion en la pagina
    Cuerpo (body): 
        - nombre
        - password
    Respuestas:
        - 200 OK: Devuelve un token de sesion para acceder a la pagina.
        - 400 Bad Request: Parametros insuficientes.
        - 404 Not found: El usuario especificado no existe.
        - 500 Internal server error: Hubo un error en la consulta
*/
router.post('/iniciarSesion', async (req, res) => {
    const { nombre, password } = req.body
    if (!nombre || !password) {
        return res.status(400).send("Parámetros insuficientes.")
    }

    try {
        const consulta = `SELECT * FROM usuario_sistema WHERE nombre_usuario = ?`
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [nombre])
        conexion.release()

        if (!respuesta[0]) return res.status(404).json({message: "El usuario no existe"})

        if (!await bcrypt.compare(password, respuesta[0].contraseña)) {
            return res.status(401).json({message: "Contraseña incorrecta."})
        }

        const token = jwt.sign(
            {id_usuario: respuesta[0].id_usuario, nombre_usuario: respuesta[0].nombre_usuario, rol: respuesta[0].admin},
            process.env.SECRETO_JWT,
            { expiresIn: '12h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
            maxAge: 43200000 // 12 horas en milisegundos
        })

        res.status(200).json({message: "Inicio de sesion satisfactorio!", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error en la consulta"})
    }
})

/* 
    POST /usuarios/crearUsuario
    Descripcion:
        - Permite crear usuarios en la pagina para ser utilizados
    Cuerpo (body): 
        - nombre
        - password
    Respuestas:
        - 201 Created: El usuario fue creado satisfactoriamente
        - 400 Bad Request: Parametros insuficientes.
        - 401 Authorization Required: El token es invalido
        - 403 Forbidden: El usuario no esta autenticado
        - 500 Internal server error: Hubo un error en la consulta
*/

router.post('/crearUsuario', async (req, res) => {
    const {nombre, password} = req.body
    const rondasSalt = 12

    if (!nombre || !password) {
       return res.status(400).send("Parametros insuficientes.")
    }

    try {
        const salt = await bcrypt.genSalt(rondasSalt)
        const contraseñaHash = await bcrypt.hash(password, salt)
        const consulta = `INSERT INTO usuario_sistema (nombre_usuario, contraseña, admin) VALUES (?, ?, 0)`
        
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, [nombre, contraseñaHash])
        conexion.release()
        res.status(201).send("Usuario creado satisfactoriamente.")
    } catch (error) {
        res.status(500).send("Error en la consulta")
    }
})

export default router

