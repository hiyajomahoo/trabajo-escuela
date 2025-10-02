import pool from './conexion_sql.js'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const router = express.Router()

router.use(express.json())
router.use(cookieParser())

// Hay que hacer esta funcion que verifique si la cookie es valida
export function verificarUsuario(req, res, next) {
    console.log("Autenticando")
    next()
}

// Hay que agregar las rutas a exportar de inicio de sesion y de creacion de usuario
router.post('/login', (req, res) => {
    // Si el usuario es valido, devolvele una token con JWT
    res.send("Funciona")
})

// Acordate de hashear y saltear las contraseñas antes de subirlas a la base de datos
router.post('/crearUsuario', verificarUsuario, (req, res) => {

})

export default router

