import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AddHotel.css';
import '../styles/GestionReserva.css'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import hotelImage from '../imagenes/imagen8.png'

const GestionReserva = ({ userId }) => {
    const [vuelos, setVuelos] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginaActual2, setPaginaActual2] = useState(1);
    const vuelosPorPagina = 2; // Máximo de 4 vuelos por página

    const indiceInicio = (paginaActual - 1) * vuelosPorPagina;
    const indiceFinal = paginaActual * vuelosPorPagina;

    const indiceInicio2 = (paginaActual2 - 1) * vuelosPorPagina;
    const indiceFinal2 = paginaActual2 * vuelosPorPagina;
  
     // Obtener los vuelos de la página actual
     const hotelesPaginaActual = hoteles.slice(indiceInicio, indiceFinal);
     const vuelosPaginaActual = vuelos.slice(indiceInicio2, indiceFinal2);
  
     // Función para cambiar de página
    const cambiarPagina = (direccion) => {
      if (direccion === 'anterior' && paginaActual > 1) {
        setPaginaActual(paginaActual - 1);
      } else if (direccion === 'siguiente' && indiceFinal < hoteles.length) {
        setPaginaActual(paginaActual + 1);
      }
    };

    const cambiarPagina2 = (direccion) => {
      if (direccion === 'anterior' && paginaActual2 > 1) {
        setPaginaActual2(paginaActual2 - 1);
      } else if (direccion === 'siguiente' && indiceFinal2 < vuelos.length) {
        setPaginaActual2(paginaActual2 + 1);
      }
    };

    useEffect(() => {
    axios.get('http://localhost:8080/api/reservaHotel/'+userId)
      .then((response) => {
        setHoteles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de hoteles:', error);
      });
      axios.get('http://localhost:8080/api/reservaVuelo/'+userId)
      .then((response) => {
        setVuelos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de hoteles:', error);
      });
    }, []);

    const handleEliminar = (id) => {
      
      axios.delete('http://localhost:8080/api/reservaHotel/'+id)
        .then((response) => {
          console.log('hotel eliminado: ',response.data)
        })
        .catch((error) => {
          console.error('Error al eliminar hotel:', error);
        });
    };

    const handleEliminar2 = (id) => {
      
      axios.delete('http://localhost:8080/api/reservaVuelo/'+id)
        .then((response) => {
          console.log('vuelo eliminado: ',response.data)
        })
        .catch((error) => {
          console.error('Error al eliminar vuelo:', error);
        });
    };

  return (
    <div>
      <h2>Gestión de Reservas</h2>
        <div>
          <h2 id="centro">Reservas de Hoteles</h2>
            <ListGroup id="centro">
              {hotelesPaginaActual.map((hotel) => (
                <ListGroup.Item key={hotel.id}>
                  <div className="hotel-info">
                    <h4>{hotel.hotel.nombre}</h4>
                    <p>Ubicación: {hotel.hotel.ubicacion}</p>
                    <p>Desde: {hotel.fechaDesde}</p>
                    <p>Hasta: {hotel.fechaHasta}</p>
                    <p>Personas: {hotel.personas}</p>
                  </div>
                  <img src={hotelImage} alt={hotel.hotel.nombre} className="hotel-image" />
                  <button className="btn btn-danger" onClick={() => handleEliminar(hotel.id)}>
                    Eliminar
                  </button>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
        <div id="centro">
          <button id="boton" onClick={() => cambiarPagina('anterior')} disabled={paginaActual === 1}>
            Página anterior
          </button>
          <span>Página {paginaActual}</span>
          <button id="boton" onClick={() => cambiarPagina('siguiente')} disabled={indiceFinal >= hoteles.length}>
            Página siguiente
          </button>
        </div>
        <div className='separar'>
          <h2 id="centro">Reservas de Vuelos</h2>
          <ListGroup id="centro">
              {vuelosPaginaActual.map((vuelo) => (
                <ListGroup.Item key={vuelo.id}>
                  <div className="hotel-info">
                    <h4>{vuelo.vuelo.origen}-{vuelo.vuelo.destino}</h4>
                    <p>Fecha: {vuelo.vuelo.fecha} - {vuelo.vuelo.hora}</p>
                    <p>Personas: {vuelo.personas}</p>
                  </div>
                  <img src={hotelImage} alt={vuelo.vuelo.id} className="hotel-image" />
                  <button className="btn btn-danger" onClick={() => handleEliminar2(vuelo.id)}>
                    Eliminar
                  </button>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
        <div id="centro">
          <button id="boton" onClick={() => cambiarPagina2('anterior')} disabled={paginaActual2 === 1}>
            Página anterior
          </button>
          <span>Página {paginaActual2}</span>
          <button id="boton" onClick={() => cambiarPagina2('siguiente')} disabled={indiceFinal2 >= vuelos.length}>
            Página siguiente
          </button>
        </div>
        
        <div id="vuelta">
          <Link to="/dashBoardUser" className="link-button">Atrás</Link>
        </div>
    </div>
  );
};

export default GestionReserva;