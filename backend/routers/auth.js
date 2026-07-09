const fs = require('fs');
const path = require('path');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
    const contenido = fs.readFileSync(rutaUsuarios, 'utf-8');
    return JSON.parse(contenido);
}

function guardarUsuarios(usuarios) {
    fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
}

function leerCuerpo(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error('JSON inválido'));
            }
        });
    });
}

async function registro(req, res) {
    try {
        const { email, username, password } = await leerCuerpo(req);

        if (!email || !username || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                error: 'Todos los campos son obligatorios'
            }));
        }

        const usuarios = leerUsuarios();

        if (usuarios.some(u => u.email === email)) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                error: 'El correo ya está registrado'
            }));
        }

        if (usuarios.some(u => u.username === username)) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                error: 'El nombre de usuario ya está en uso'
            }));
        }

        usuarios.push({ email, username, password });
        guardarUsuarios(usuarios);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Usuario registrado correctamente'
        }));

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
}

async function login(req, res) {
    try {
        const { username, password } = await leerCuerpo(req);

        if (!username || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                error: 'Usuario y contraseña son obligatorios'
            }));
        }

        const usuarios = leerUsuarios();
        const usuario = usuarios.find(
            u => u.username === username && u.password === password
        );

        if (!usuario) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                error: 'Credenciales incorrectas'
            }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: `Bienvenido, ${username}`
        }));

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
}

module.exports = { registro, login };