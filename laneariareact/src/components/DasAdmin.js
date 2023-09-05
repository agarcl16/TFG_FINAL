import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/AddHotel.css';
import ImageCarouselAdmin from './ImageCarouselAdmin'; 

const Dashboard = () => {
  return (
    <div>
      <h2 id="centro">Bienvenido al DashBoard de Administrador</h2>
        <div className="App">
            <nav>
            <Link to="/dashBoardAdmin/addHotel">Gestionar Hoteles</Link>
            <Link to="/dashBoardAdmin/addVuelo">Gestionar Vuelos</Link>
            <Link to="/dashBoardAdmin/addUser">Gestionar Usuarios</Link>
            </nav>
        </div>
      <div className="Carrusel"> 
        <ImageCarouselAdmin />
      </div>
      <div id="vuelta">
        <Link to="/" className="link-button">Log Out</Link>
      </div>
    </div>
  );
};

export default Dashboard;