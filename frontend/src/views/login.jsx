import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { servicioLogin } from '../services/authService';
import FooterLogo from '../components/FooterLogo';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            const resultado = await servicioLogin(username, password);
            if (resultado.ok) {
                alert(resultado.data.message);
                navigate('/menu');
            } else {
                alert(resultado.data.error);
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <div className="contenedor_principal_login">
            <h1 className="titulo_login">Inicio de sesión</h1>
            <hr className="separador" />

            <div className="username">
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="password">
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="button" className="boton_iniciar" onClick={handleLogin}>
                Iniciar
            </button>

            <div className="enlaces_secundario registro">
                <p>¿No tienes cuenta? <Link to="/register" className="enlace_registro">Regístrate aquí</Link></p>
                <p>¿Has olvidado tu contraseña? <Link to="/forgot-password" className="enlace_recuperar">Recupérala aquí</Link></p>
            </div>

            <FooterLogo />
        </div>
    );
}

export default Login;