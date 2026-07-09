const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
    const contenido = fs.readFileSync(rutaUsuarios, 'utf-8');
    return JSON.parse(contenido);
}

function guardarUsuarios(usuarios) {
    fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
}

// Registro //
router.post('/registrar', (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios'
            });
        }

        const usuarios = leerUsuarios();

        if (usuarios.some(u => u.email === email)) {
            return res.status(409).json({
                error: 'El correo ya está registrado'
            });
        }

        if (usuarios.some(u => u.username === username)) {
            return res.status(409).json({
                error: 'El nombre de usuario ya está en uso'
            });
        }

        usuarios.push({ email, username, password });
        guardarUsuarios(usuarios);

        res.status(201).json({
            message: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Login //

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: 'Usuario y contraseña son obligatorios'
            });
        }

        const usuarios = leerUsuarios();
        const usuario = usuarios.find(
            u => u.username === username && u.password === password
        );

        if (!usuario) {
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });
        }

        res.status(200).json({
            message: `Bienvenido, ${username}`
        });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;