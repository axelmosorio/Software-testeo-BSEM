import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FooterLogo from '../components/FooterLogo';

const EliminarCDP = () => {
    const navigate = useNavigate();
    const [casos, setCasos] = useState([
        { id: '1', nombre: 'CDP-001 Login fallido', contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de login\nPaso 3: Ingresar usuario incorrecto\nPaso 4: Ingresar contraseña incorrecta\nPaso 5: Hacer clic en Iniciar\nPaso 6: Verificar mensaje de error" },
        { id: '2', nombre: 'CDP-002 Login exitoso', contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de login\nPaso 3: Ingresar usuario correcto\nPaso 4: Ingresar contraseña correcta\nPaso 5: Hacer clic en Iniciar\nPaso 6: Verificar redirección al menú" },
        { id: '3', nombre: 'CDP-003 Registro fallido', contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de registro\nPaso 3: Dejar campos vacíos\nPaso 4: Hacer clic en Registrar\nPaso 5: Verificar mensaje de error" },
        { id: '4', nombre: 'CDP-004 Registro exitoso', contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de registro\nPaso 3: Completar todos los campos correctamente\nPaso 4: Hacer clic en Registrar\nPaso 5: Verificar redirección al login" },
        { id: '5', nombre: 'CDP-005 Módulo 1 creación exitosa', contenido: "Paso 1: Iniciar sesión\nPaso 2: Ir a Gestionar casos\nPaso 3: Hacer clic en Crear caso\nPaso 4: Completar nombre y pasos\nPaso 5: Hacer clic en Ejecutar\nPaso 6: Verificar que el caso aparece en la lista" }
    ]);
    const [busqueda, setBusqueda] = useState('');
    const [casoSeleccionado, setCasoSeleccionado] = useState(null);
    const [nombreEditado, setNombreEditado] = useState('');
    const [contenidoEditado, setContenidoEditado] = useState('');
    const [lineas, setLineas] = useState([1]);

    useEffect(() => {
        const totalLineas = contenidoEditado ? contenidoEditado.split('\n').length : 1;
        setLineas(Array.from({ length: totalLineas }, (_, i) => i + 1));
    }, [contenidoEditado]);

    useEffect(() => {
        document.body.classList.add('body_modificar');
        return () => document.body.classList.remove('body_modificar');
    }, []);

    const seleccionarCaso = (caso) => {
        setCasoSeleccionado(caso);
        setNombreEditado(caso.nombre);
        setContenidoEditado(caso.contenido);
    };

    const ejecutarEliminar = () => {
        if (!casoSeleccionado) return;
        if (window.confirm(`¿Estás seguro de que deseas eliminar: ${casoSeleccionado.nombre}?`)) {
            setCasos(casos.filter(c => c.id !== casoSeleccionado.id));
            setCasoSeleccionado(null);
            setNombreEditado('');
            setContenidoEditado('');
            alert('Caso de prueba eliminado con éxito.');
        }
    };

    const casosFiltrados = casos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="body_eliminar">
            <Header rutaVolver="/gestionar" />
            <main className="contenedor_eliminar">
                <aside className="panel_lateral_eliminar">
                    <div className="encabezado_lateral_eliminar">
                        <h1 className="titulo_gestion">Eliminar caso de prueba</h1>
                        <hr className="separador_gestion_lateral" />
                    </div>
                    <input
                        type="text"
                        className="buscador_casos"
                        placeholder="Buscar caso de prueba..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <div className="lista_casos_eliminar">
                        {casosFiltrados.map(caso => (
                            <div
                                key={caso.id}
                                className={`item_caso ${casoSeleccionado?.id === caso.id ? 'seleccionado' : ''}`}
                                onClick={() => seleccionarCaso(caso)}
                            >
                                <span className="nombre_caso">{caso.nombre}</span>
                            </div>
                        ))}
                    </div>
                </aside>
                <section className="panel_edicion_eliminar">
                    <div className="encabezado_edicion_eliminar">
                        <div className="campo_modificar_linea">
                            <input
                                type="text"
                                value={nombreEditado}
                                placeholder="Selecciona un caso de prueba para ver detalles"
                                readOnly
                            />
                        </div>
                        <span className="badge_sin_cambios">Vista de Eliminación</span>
                    </div>
                    <div className="area_texto_numerada_eliminar">
                        <div className="area_numeros_eliminar">
                            {lineas.map(n => <span key={n}>{n}.</span>)}
                        </div>
                        <textarea
                            className="textarea_eliminar"
                            value={contenidoEditado}
                            placeholder="Selecciona un caso de la lista para revisar su contenido..."
                            readOnly
                            disabled={!casoSeleccionado}
                        />
                    </div>
                    <div className="panel_acciones_eliminar">
                        <button className="boton_ejecutar" onClick={() => alert('Ejecutar: función disponible próximamente')}>Ejecutar</button>
                        <button className="boton_resultado" onClick={() => alert('Resultado: función disponible próximamente')}>Resultados</button>
                        <button className="boton_eliminar" onClick={ejecutarEliminar} disabled={!casoSeleccionado}>Eliminar</button>
                        <div className="separador_acciones"></div>
                        <button className="boton_cancelar" onClick={() => { setCasoSeleccionado(null); setNombreEditado(''); setContenidoEditado(''); }} disabled={!casoSeleccionado}>Cancelar</button>
                    </div>
                </section>
            </main>
            <FooterLogo />
        </div>
    );
};

export default EliminarCDP;