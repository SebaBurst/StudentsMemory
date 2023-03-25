import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import VistaLogin from './componentes/login'
import VistaProfe from './componentes/profesor'
import VistaEstudiante from './componentes/estudiante'
import VistaRegistro from './componentes/Register'
import ProyectoGuia from './componentes/profesoresComponentes/ProyectoGuia';
import AdminDashboard from './componentes/AdminDashboard';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path='/proyecto/:id' element ={<ProyectoGuia/>}/>
        <Route path="/" element={<VistaLogin/>} />
        <Route path="/administrador" element={<AdminDashboard/>} />
        <Route path="/login" element={<VistaLogin/>} />
        <Route path="/profesor" element={<VistaProfe/>} />
        <Route path="/estudiante" element={<VistaEstudiante/>} />
        <Route path="/registro" element={<VistaRegistro/>} />
      </Routes>

    );
  }
}



export default App;