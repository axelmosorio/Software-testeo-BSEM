import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FooterLogo from '../components/FooterLogo';

const ModificarCDP = () => {
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
    const [nombreOriginal, setNombreOriginal] = useState('');
    const [contenidoOriginal, setContenidoOriginal] = useState('');
    const [nombreEditado, setNombreEditado] = useState('');
    const [contenidoEditado, setContenidoEditado] = useState('');
    const [badgeEstado, setBadgeEstado] = useState({ texto: 'Sin cambios', clase: 'badge_sin_cambios' });
    const [lineas, setLineas] = useState([1]);

    useEffect(() => {
        const totalLineas = contenidoEditado.split('\n').length;
        setLineas(Array.from({ length: totalLineas }, (_, i) => i + 1));
    }, [contenidoEditado]);

    useEffect(() => {
        if (!casoSeleccionado) return;
        if (nombreEditado !== nombreOriginal || contenidoEditado !== contenidoOriginal) {
            setBadgeEstado({ texto: 'Cambios sin guardar', clase: 'badge_sin_cambios modificado' });
        } else {
            setBadgeEstado({ texto: 'Sin cambios', clase: 'badge_sin_cambios' });
        }
    }, [nombreEditado, contenidoEditado, nombreOriginal, contenidoOriginal, casoSeleccionado]);

    useEffect(() => {
        document.body.classList.add('body_modificar');
        return () => document.body.classList.remove('body_modificar');
    }, []);

    const seleccionarCaso = (caso) => {
        setCasoSeleccionado(caso);
        setNombreOriginal(caso.nombre);
        setContenidoOriginal(caso.contenido);
        setNombreEditado(caso.nombre);
        setContenidoEditado(caso.contenido);
        setBadgeEstado({ texto: 'Sin cambios', clase: 'badge_sin_cambios' });
    };

    const guardarCambios = () => {
        if (!nombreEditado.trim()) {
            alert('El nombre del caso no puede estar vacío.');
            return;
        }
        setCasos(casos.map(c =>
            c.id === casoSeleccionado.id
                ? { ...c, nombre: nombreEditado, contenido: contenidoEditado }
                : c
        ));
        setNombreOriginal(nombreEditado);
        setContenidoOriginal(contenidoEditado);
        setBadgeEstado({ texto: 'Guardado', clase: 'badge_sin_cambios guardado' });
    };

    const cancelarCambios = () => {
        if (nombreEditado !== nombreOriginal || contenidoEditado !== contenidoOriginal) {
            if (!window.confirm('¿Descartar los cambios realizados?')) return;
        }
        setNombreEditado(nombreOriginal);
        setContenidoEditado(contenidoOriginal);
    };

    const casosFiltrados = casos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="body_modificar">
            <Header rutaVolver="/gestionar" />
            <main className="contenedor_modificar">
                <aside className="panel_lateral_modificar">
                    <div className="encabezado_lateral_modificar">
                        <h1 className="titulo_gestion">Modificar caso de prueba</h1>
                        <hr className="separador_gestion_lateral" />
                    </div>
                    <input
                        type="text"
                        className="buscador_casos"
                        placeholder="Buscar caso de prueba..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <div className="lista_casos_modificar">
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

                <section className="panel_edicion_modificar">
                    <div className="encabezado_edicion_modificar">
                        <div className="campo_modificar_linea">
                            <input
                                type="text"
                                placeholder="Selecciona un caso de prueba para editar"
                                value={nombreEditado}
                                onChange={(e) => setNombreEditado(e.target.value)}
                                readOnly={!casoSeleccionado}
                            />
                        </div>
                        <span className={badgeEstado.clase}>{badgeEstado.texto}</span>
                    </div>

                    <div className="area_texto_numerada_modificar">
                        <div className="area_numeros_modificar">
                            {lineas.map(n => <span key={n}>{n}.</span>)}
                        </div>
                        <textarea
                            className="textarea_modificar"
                            placeholder="Selecciona un caso de la lista para editar su contenido..."
                            value={contenidoEditado}
                            onChange={(e) => setContenidoEditado(e.target.value)}
                            disabled={!casoSeleccionado}
                        />
                    </div>

                    <div className="panel_acciones_modificar">
                        <button className="boton_ejecutar" onClick={() => alert('Ejecutar: función disponible próximamente')}>Ejecutar</button>
                        <button className="boton_resultado" onClick={() => alert('Resultado: función disponible próximamente')}>Resultados</button>
                        <button className="boton_automatizar" onClick={() => alert('Automatizar: función disponible próximamente')}>Automatizar</button>
                        <div className="separador_acciones"></div>
                        <button className="boton_cancelar" onClick={cancelarCambios} disabled={!casoSeleccionado}>Cancelar</button>
                        <button className="boton_guardar" onClick={guardarCambios} disabled={badgeEstado.texto !== 'Cambios sin guardar'}>Guardar cambios</button>
                    </div>
                </section>
            </main>
            <FooterLogo />
        </div>
    );
};

export default ModificarCDP;