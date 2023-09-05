import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/AddHotel.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ReservaHotel = ({ userId }) => {
  const [fecha, setFecha] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [num, setNum] = useState('');
  const [hoteles, setHoteles] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [showMessage, setShowMessage] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    axios.get('http://localhost:8080/api/hoteles/'+ubicacion)
      .then((response) => {
        setHoteles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de hoteles:', error);
      });
    
  };

  const handleTerminar = (hotel,usuario) => {
    // Crear un objeto con los datos de la nueva reserva
    const newReserva = {
      hotel : hotel,
      user : usuario,
      fechaDesde : fecha,
      fechaHasta : fechaHasta,
      personas : num,
    };

    console.log(newReserva);
  
  axios.post('http://localhost:8080/api/reservaHotel',newReserva)
    .then((response) => {
      console.log('reserva creada:', response.data)
    })
    .catch((error) => {
      console.error('Error al insertar reserva:', error);
    });
  };


  const handleReservar = (hotel) => {
    
    axios.get('http://localhost:8080/apirest/'+userId)
      .then((response) => {
        console.log('Usuario encontrado: ',response.data)
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuario:', error);
      });

      handleTerminar(hotel,usuario);
      
    
  };

  return (
    <div>
      <h2 id="centro">Reservar Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha Desde:</label>
          <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div>
          <label>Fecha Hasta:</label>
          <input type="text" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
        </div>
        <div>
          <label>Número de personas:</label>
          <input type="text" value={num} onChange={(e) => setNum(e.target.value)} />
        </div>
        <button type="submit" onClick={handleChange}>Buscar</button>
        
        <div id="vuelta">
          <Link to="/dashBoardUser" className="link-button">Atrás</Link>
        </div>

        <div>
            <h3>Listado:</h3>
          <ListGroup>
            {hoteles.map((hotel) => (
              <ListGroup.Item key={hotel.id}>
                Nombre: {hotel.nombre} - Ubicación: {hotel.ubicacion} - Valoración: {hotel.valoracion} - Precio: {hotel.precio}
                <br />    
                <button onClick={() => handleReservar(hotel)}>Reservar</button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </form>
    </div>
  );
};

export default ReservaHotel;