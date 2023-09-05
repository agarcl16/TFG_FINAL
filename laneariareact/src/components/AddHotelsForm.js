import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AddHotel.css';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const AddHotelForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [valoration, setValoration] = useState('');
  const [prize, setPrize] = useState('');
  const [hoteles, setHoteles] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const vuelosPorPagina = 4; // Máximo de 4 vuelos por página

  const indiceInicio = (paginaActual - 1) * vuelosPorPagina;
  const indiceFinal = paginaActual * vuelosPorPagina;

   // Obtener los vuelos de la página actual
   const hotelesPaginaActual = hoteles.slice(indiceInicio, indiceFinal);

   // Función para cambiar de página
  const cambiarPagina = (direccion) => {
    if (direccion === 'anterior' && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else if (direccion === 'siguiente' && indiceFinal < hoteles.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener la lista de hoteles
    axios.get('http://localhost:8080/api/hoteles')
      .then((response) => {
        setHoteles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de hoteles:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del nuevo hotel
    const newHotel = {
      nombre: name,
      ubicacion: location,
      valoracion: valoration,
      precio: prize,
    };

    // Enviar la petición POST al backend para añadir el hotel
    axios.post('http://localhost:8080/api/hoteles', newHotel)
      .then(response => {
        console.log('Hotel añadido:', response.data);
        // Limpiar los campos del formulario después de añadir el hotel
        setName('');
        setLocation('');
        setValoration('');
        setPrize('');
      })
      .catch(error => {
        console.error('Error al añadir el hotel:', error);
      });
      window.location.reload();
  };

  const handleEliminar = (id) => {
    
    axios.delete('http://localhost:8080/api/hoteles/'+id)
      .then((response) => {
        console.log('hotel eliminado: ',response.data)
      })
      .catch((error) => {
        console.error('Error al eliminar hotel:', error);
      });
      window.location.reload();
  };

  return (
    <div>
      <h2 id="centro">Añadir Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Hotel:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Valoración:</label>
          <input type="text" value={valoration} onChange={(e) => setValoration(e.target.value)} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="text" value={prize} onChange={(e) => setPrize(e.target.value)} />
        </div>
        <button type="submit">Añadir Hotel</button>
      </form>
      <div id="vuelta">
        <Link to="/dashBoardAdmin" className="link-button">Volver al DashBoard</Link>
      </div>
      <h2 id="centro">Lista de Hoteles</h2>
      <ListGroup id="centro">
        {hotelesPaginaActual.map((hotel) => (
          <ListGroup.Item key={hotel.id}>
            Nombre: {hotel.nombre} - Ubicación: {hotel.ubicacion} - Valoración: {hotel.valoracion} - Precio: {hotel.precio}
            <br />
            <button id="boton" onClick={() => handleEliminar(hotel.id)}>Eliminar</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div id="centro">
        <button id="boton" onClick={() => cambiarPagina('anterior')} disabled={paginaActual === 1}>
          Página anterior
        </button>
        <span>Página {paginaActual}</span>
        <button id="boton" onClick={() => cambiarPagina('siguiente')} disabled={indiceFinal >= hoteles.length}>
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default AddHotelForm;