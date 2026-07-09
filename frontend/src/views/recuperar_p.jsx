import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FooterLogo from '../components/FooterLogo';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRecuperar = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Se ha enviado un enlace de recuperación a: ${email}`);
            navigate('/login');
        }
    };

    return (
        <main className="contenedor_recuperar">
            <h2 className="titulo_recuperar">Recuperar contraseña</h2>
            <hr className="separador" />

            <div className="contenido_izquierda">
                <label className="label_recuperar">
                    Escribe tu correo electrónico y te enviaremos un link para restablecer tu contraseña
                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="button" className="boton_iniciar" onClick={handleRecuperar}>
                    Enviar enlace
                </button>

                <p className="texto_footer_recuperar">
                    ¿Ya tienes tu contraseña? <Link to="/login" className="enlace_login">Inicia sesión aquí</Link>
                </p>
            </div>

            <FooterLogo />
        </main>
    );
}

export default ForgotPassword;