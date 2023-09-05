import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import DasAdmin from './components/DasAdmin';
import AddHotel from './components/AddHotelsForm';
import AddVuelo from './components/AddVuelosForm';
import AddUser from './components/AddUserForm';
import DasUser from './components/DasUser';
import ReservaHotel from './components/ReservaHotel';
import ReservaVuelo from './components/ReservaVuelo';
import GestionReserva from './components/GestionReserva';
import axios from 'axios';
import logo from './components/Logo.jpg';
import footer from './components/Footer';
import Footer from './components/Footer';

function App() {
  const [userId, setUserId] = React.useState(null);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    // Validación básica del usuario y la contraseña
    if (username === 'admin' && password === 'admin') {
      navigate('/dashBoardAdmin');
    } else {
      try {
        const usuario = {
          name: username,
          password: password,
        };
        const response = await axios.post('http://localhost:8080/apirest/user', usuario);
  
        // Si la solicitud es exitosa, actualiza el estado del usuario y redirecciona al Dashboard
        setUserId(response.data);
        if(response.data!==null)
        navigate('/dashBoardUser');
        else console.log('No existe el usuario');
      } catch (error) {
        console.log('error');
      }
    }
  };
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="logo">
          <img src={logo} alt="Logo de Lanearia" id="logo" />
          <h1 id="title">LANEARIA</h1>
        </div>
        <nav className="main-nav">
          <Link to="/registro">Registro</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
      <div className="app-content">
      <Routes>
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/dashBoardAdmin" element={<DasAdmin />} />
        <Route path="/dashBoardAdmin/addHotel" element={<AddHotel />} />
        <Route path="/dashBoardAdmin/addVuelo" element={<AddVuelo />} />
        <Route path="/dashBoardAdmin/addUser" element={<AddUser />} />
        <Route path="/dashBoardUser" element={<DasUser userId={userId} />} />
        <Route
          path="/dashBoardUser/reservaHotel"
          element={<ReservaHotel userId={userId}/>}
        />
        <Route
          path="/dashBoardUser/reservaVuelo"
          element={<ReservaVuelo userId={userId}/>}
        />
        <Route
          path="/dashBoardUser/gestionReserva"
          element={<GestionReserva userId={userId}/>}
        />
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}
/*
<Router>
      <div className="App">
        <h1>Aplicación de Hoteles y vuelos</h1>
        <nav>
          <Link to="/añadir-hotel">Añadir Hotel</Link>
        </nav>
        <Routes>
          <Route path="/añadir-hotel" element={<AddHotelForm />} />
          <Route path="/" element={<HotelList />} />
        </Routes>
      </div>
    </Router>
    */

export default App;