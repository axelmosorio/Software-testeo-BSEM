import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { servicioRegistro } from '../services/authService';
import FooterLogo from '../components/FooterLogo';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (email && username && password) {
            const resultado = await servicioRegistro(email, username, password);
            if (resultado.ok) {
                alert(resultado.data.message);
                navigate('/login');
            } else {
                alert(resultado.data.error);
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <div className="contenedor_principal_registro">
            <h1 className="titulo_registro">Registro de usuarios</h1>
            <hr className="separador" />
            <div className="email">
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="username">
                <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="password">
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="button" className="boton_registrar" onClick={handleRegister}>
                Registrar cuenta
            </button>
            <div className="enlaces_secundarios registro">
                <p>¿Ya tienes una cuenta? <Link to="/login" className="enlace_login">Inicia sesión aquí</Link></p>
            </div>
            <FooterLogo />
        </div>
    );
}

export default Register;