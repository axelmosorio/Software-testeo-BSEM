import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FooterLogo from '../components/FooterLogo';

const Generar = () => {
    const [casos] = useState([
        {
            id: '1',
            nombre: 'CDP-001 Login fallido',
            contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de login\nPaso 3: Ingresar usuario incorrecto\nPaso 4: Ingresar contraseña incorrecta\nPaso 5: Hacer clic en Iniciar\nPaso 6: Verificar mensaje de error",
            errores: 2,
            lineasError: [2, 4],
            resumen: "Prueba de login con credenciales incorrectas. Se detectaron errores en la entrada de datos. Se recomienda validar los campos antes del envío."
        },
        {
            id: '2',
            nombre: 'CDP-002 Login exitoso',
            contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de login\nPaso 3: Ingresar usuario correcto\nPaso 4: Ingresar contraseña correcta\nPaso 5: Hacer clic en Iniciar\nPaso 6: Verificar redirección al menú",
            errores: 0,
            lineasError: [],
            resumen: "Prueba de login con credenciales correctas. No se detectaron errores. El flujo de autenticación funciona correctamente."
        },
        {
            id: '3',
            nombre: 'CDP-003 Registro fallido',
            contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de registro\nPaso 3: Dejar campos vacíos\nPaso 4: Hacer clic en Registrar\nPaso 5: Verificar mensaje de error",
            errores: 3,
            lineasError: [3, 4, 5],
            resumen: "Prueba de registro con campos vacíos. Se encontraron múltiples errores de validación. Es necesario implementar validaciones en el frontend y backend."
        },
        {
            id: '4',
            nombre: 'CDP-004 Registro exitoso',
            contenido: "Paso 1: Abrir el navegador\nPaso 2: Ir a la pantalla de registro\nPaso 3: Completar todos los campos correctamente\nPaso 4: Hacer clic en Registrar\nPaso 5: Verificar redirección al login",
            errores: 0,
            lineasError: [],
            resumen: "Prueba de registro con datos válidos. No se detectaron errores. El flujo de creación de cuenta funciona según lo esperado."
        },
        {
            id: '5',
            nombre: 'CDP-005 Módulo 1 creación exitosa',
            contenido: "Paso 1: Iniciar sesión\nPaso 2: Ir a Gestionar casos\nPaso 3: Hacer clic en Crear caso\nPaso 4: Completar nombre y pasos\nPaso 5: Hacer clic en Ejecutar\nPaso 6: Verificar que el caso aparece en la lista",
            errores: 1,
            lineasError: [4],
            resumen: "Prueba de creación de caso de prueba. Se detectó un error en el paso de completar los campos. Se recomienda revisar las validaciones del formulario."
        }
    ]);

    const [busqueda, setBusqueda] = useState('');
    const [casoActivo, setCasoActivo] = useState(null);

    useEffect(() => {
        document.body.classList.add('body_informe');
        return () => document.body.classList.remove('body_informe');
    }, []);

    const casosFiltrados = casos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const descargar = () => {
        if (!casoActivo) return;
        const texto =
`INFORME DE CASO DE PRUEBA
==========================
Caso: ${casoActivo.nombre}

CÓDIGO DEL CASO:
${casoActivo.contenido}

ERRORES DETECTADOS: ${casoActivo.errores}
Líneas con error: ${casoActivo.lineasError.length > 0 ? casoActivo.lineasError.join(', ') : 'Ninguna'}

RESUMEN:
${casoActivo.resumen}
`;
        const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `informe_${casoActivo.nombre.replace(/\s+/g, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="body_informe">
            <Header rutaVolver="/menu" />
            <main className="contenedor_informe">

                {/* Panel izquierdo */}
                <aside className="panel_lateral_informe">
                    <div className="encabezado_lateral_informe">
                        <h1 className="titulo_gestion">Generar informe de caso de prueba</h1>
                        <hr className="separador_gestion_lateral" />
                    </div>
                    <input
                        type="text"
                        className="buscador_casos"
                        placeholder="Buscar caso de prueba..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <div className="lista_casos_informe">
                        {casosFiltrados.map(caso => (
                            <div
                                key={caso.id}
                                className={`item_caso ${casoActivo?.id === caso.id ? 'seleccionado' : ''}`}
                                onClick={() => setCasoActivo(caso)}
                            >
                                <span className="nombre_caso">{caso.nombre}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Panel central */}
                <section className="panel_resultado_informe">
                    {!casoActivo ? (
                        <div className="estado_vacio_informe">
                            <span className="icono_vacio">📋</span>
                            <p>Selecciona un caso de prueba para ver su informe</p>
                        </div>
                    ) : (
                        <div className="contenido_informe">

                            <div className="encabezado_resultado_informe">
                                <h2 className="titulo_resultado_informe">
                                    {casoActivo.nombre}: resultados de este caso de prueba
                                </h2>
                                <button className="boton_descargar" onClick={descargar}>
                                    ⬇ Descargar
                                </button>
                            </div>

                            <div className="cuerpo_informe">

                                {/* Columna izquierda: código */}
                                <div className="columna_codigo_informe">
                                    <div className="area_texto_numerada_informe">
                                        <div className="area_numeros_informe">
                                            {casoActivo.contenido.split('\n').map((_, i) => (
                                                <span key={i}>{i + 1}.</span>
                                            ))}
                                        </div>
                                        <div className="area_lineas_informe">
                                            {casoActivo.contenido.split('\n').map((linea, i) => (
                                                <div
                                                    key={i}
                                                    className={`linea_codigo ${casoActivo.lineasError.includes(i + 1) ? 'linea_error' : ''}`}
                                                >
                                                    {linea}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="area_marcadores_informe">
                                            {casoActivo.contenido.split('\n').map((_, i) => (
                                                <div key={i} className="marcador_linea">
                                                    {casoActivo.lineasError.includes(i + 1) ? '✕' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Columna derecha: métricas */}
                                <div className="columna_metricas_informe">
                                    <div className={`tarjeta_errores_informe ${casoActivo.errores === 0 ? 'sin_errores' : ''}`}>
                                        <span className="label_errores">Errores detectados</span>
                                        <span className="numero_errores">{casoActivo.errores}</span>
                                    </div>
                                    <div className="tarjeta_resumen_informe">
                                        <h3 className="titulo_resumen">Resumen de la prueba</h3>
                                        <p className="texto_resumen">{casoActivo.resumen}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </section>

            </main>
            <FooterLogo />
        </div>
    );
};

export default Generar;