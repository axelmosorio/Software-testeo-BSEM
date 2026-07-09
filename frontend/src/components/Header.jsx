import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ rutaVolver }) {
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            navigate('/login');
        }
    };

    return (
        <header className="header_menu">
            <div className="logo_marca_testeo">
                <div className="icon_logo">S</div>
                <div className="texto_marca">
                    <strong>Software INC</strong>
                    <span>(testeo)</span>
                </div>
            </div>
            <div className="estado_administrador">
                <span className="label_permisos">Permisos de administrador: </span>
                <div className="indicador_activo">
                    <span className="puntero_activo"></span>
                    Activo
                </div>
            </div>
            <div className="acciones_de_arriba">
                <button className="boton_nav" onClick={() => navigate(rutaVolver)}>←</button>
                <button className="boton_nav" onClick={() => window.history.forward()}>→</button>
                <button className="cerrar_sesion" onClick={handleCerrarSesion}>Cerrar sesión</button>
            </div>
        </header>
    );
}

export default Header;