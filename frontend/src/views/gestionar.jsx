import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FooterLogo from '../components/FooterLogo';

const GestionarMenu = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('body_gestion');
        return () => document.body.classList.remove('body_gestion');
    }, []);

    return (
        <div className="body_gestion">
            <Header rutaVolver="/menu" />
            <main className="contenedor_gestion">
                <aside className="panel_lateral_gestion">
                    <h1 className="titulo_gestion">Gestionar casos de prueba</h1>
                    <hr className="separador_gestion" />
                    <button className="opcion_gestion" onClick={() => navigate('/crear-cdp')}>
                        Crear caso de prueba
                    </button>
                    <button className="opcion_gestion" onClick={() => navigate('/modificar-cdp')}>
                        Modificar caso de prueba
                    </button>
                    <button className="opcion_gestion" onClick={() => navigate('/eliminar-cdp')}>
                        Eliminar caso de prueba
                    </button>
                </aside>
            </main>
            <FooterLogo />
        </div>
    );
};

export default GestionarMenu;