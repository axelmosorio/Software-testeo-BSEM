import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FooterLogo from '../components/FooterLogo';

const CrearCDP = () => {
    const navigate = useNavigate();
    const [nombreCaso, setNombreCaso] = useState('');
    const [pasos, setPasos] = useState('');
    const [lineas, setLineas] = useState([1]);

    useEffect(() => {
        const totalLineas = pasos === '' ? 1 : pasos.split('\n').length;
        setLineas(Array.from({ length: totalLineas }, (_, i) => i + 1));
    }, [pasos]);

    useEffect(() => {
        document.body.classList.add('body_crear');
        return () => document.body.classList.remove('body_crear');
    }, []);

    return (
        <div className="body_crear">
            <Header rutaVolver="/gestionar" />
            <main className="contenedor_creacion">
                <aside className="panel_lateral_creacion">
                    <div className="encabezado_lateral_creacion">
                        <h1 className="titulo_gestion">Crear caso de prueba</h1>
                        <hr className="separador_gestion_lateral" />
                    </div>
                    <div className="seccion_instrucciones_creacion">
                        <h2 className="subtitulo_creacion">Pasos para crear un caso de prueba</h2>
                        <ol className="lista_pasos_creacion">
                            <li>Nombre del caso de prueba</li>
                            <li>Descripción del objetivo</li>
                            <li>Precondiciones</li>
                            <li>Pasos detallados</li>
                            <li>Datos de prueba</li>
                            <li>Resultado esperado</li>
                            <li>Asignar prioridad</li>
                            <li>Clasificar por módulo</li>
                        </ol>
                    </div>
                </aside>
                <section className="panel_edicion_creacion">
                    <div className="encabezado_edicion_creacion">
                        <div className="campo_creacion_linea">
                            <input
                                type="text"
                                placeholder="Nombre del caso de prueba"
                                value={nombreCaso}
                                onChange={(e) => setNombreCaso(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="area_texto_numerada_creacion">
                        <div className="area_numeros_creacion">
                            {lineas.map((num) => <span key={num}>{num}.</span>)}
                        </div>
                        <textarea
                            className="textarea_creacion"
                            placeholder="Inserte los pasos del caso de prueba..."
                            value={pasos}
                            onChange={(e) => setPasos(e.target.value)}
                        />
                    </div>
                    <div className="panel_acciones_creacion">
                        <button className="opcion_creacion_ejecutar" onClick={() => alert('Ejecutar: función disponible próximamente')}>Ejecutar</button>
                        <button className="opcion_creacion_resultados" onClick={() => alert('Resultado: función disponible próximamente')}>Resultados</button>
                    </div>
                </section>
            </main>
            <FooterLogo />
        </div>
    );
};

export default CrearCDP;