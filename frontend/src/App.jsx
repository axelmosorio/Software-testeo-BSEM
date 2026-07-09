import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/login';
import Register from './views/registro';
import ForgotPassword from './views/recuperar_p';
import MenuPrincipal from './views/menu';
import GestionarMenu from './views/gestionar';
import CrearCDP from './views/crear_cdp';
import ModificarCDP from './views/modificar_cdp';
import EliminarCDP from './views/eliminar_cdp';
import Generar from './views/generar';

function App() {
    return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/menu' element={<MenuPrincipal />} />
        <Route path='/gestionar' element={<GestionarMenu />} />
        <Route path='/informe' element={<Generar />} />
        <Route path='/crear-cdp' element={<CrearCDP />} />
        <Route path='/modificar-cdp' element={<ModificarCDP />} />
        <Route path='/eliminar-cdp' element={<EliminarCDP />} />
      </Routes>
    </Router>
    );
}

export default App;