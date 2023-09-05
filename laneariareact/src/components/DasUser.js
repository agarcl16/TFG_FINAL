import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/AddHotel.css';
import '../styles/DasUser.css';
import ImageCarousel from './ImageCarousel'; 
import hotelpe from '../imagenes/hotelpe.png'
import avionpe from '../imagenes/avionpe.png'
import reservape from '../imagenes/reservape.png'
const Dashboard = ({userId}) => {
  return (
    <div id="centro">
      <div className="menu-container">
        <h2 className="menu-title">Bienvenido al DashBoard</h2>
        <div className="menu-links">
          <nav>
            <Link to="/dashBoardUser/reservaHotel" className="menu-link">
              Reservar Hotel
              <img src={hotelpe} alt="hotelpe" />
            </Link>
            <Link to="/dashBoardUser/reservaVuelo" className="menu-link">
              Reservar Vuelo
              <img src={avionpe} alt="avionpe" />
            </Link>
            <Link to="/dashBoardUser/gestionReserva" className="menu-link">
              Gestionar Reserva
              <img src={reservape} alt="reservape" />
            </Link>
          </nav>
        </div>
      </div>
          <h2>Novedades y Ofertas</h2>
      <div className="Carrusel"> 
        <ImageCarousel />
      </div>
      <div id="vuelta">
        <Link to="/" className="link-button">Log Out</Link>
      </div>
    </div>
  );
};

export default Dashboard;