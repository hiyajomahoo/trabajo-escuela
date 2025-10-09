import pool from './conexion_sql.js'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'

const router = express.Router()

router.use(express.json())
router.use(cookieParser())

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

router.post('/iniciarSesion', async (req, res) => {
    if (!req.body) return res.status(400).send("Parametros insuficientes.")
    const {nombre, password} = req.body

    if (!nombre || !password) {
       return res.status(400).send("Parametros insuficientes.")
    }

    try {
        const consulta = `SELECT * FROM usuario_sistema WHERE nombre_usuario = ?`
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(consulta, nombre)
        conexion.release()

        if (!await bcrypt.compare(password, respuesta[0].contraseña)) {
            return res.status(401).send("Contraseña incorrecta.")
        }

        const token = jwt.sign(
            {id_usuario: respuesta[0].id_usuario, nombre_usuario: respuesta[0].nombre_usuario, rol: respuesta[0].admin},
            process.env.SECRETO_JWT,
            { expiresIn: '12h' }
        )

        res.cookie('tokenSesion', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 43200000 // 12 horas en milisegundos
        })

        res.json({message: "Inicio de sesion satisfactorio!", token})
    } catch (error) {
        res.status(500).send("Error en la consulta")
    }
    
})

router.post('/crearUsuario', verificarUsuario, async (req, res) => {
    if (!req.body) return res.status(400).send("Parametros insuficientes.")
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
        res.send("Usuario creado satisfactoriamente.")
    } catch (error) {
        res.status(500).send("Error en la consulta")
    }
})

export default router

