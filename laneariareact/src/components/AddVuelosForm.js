import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AddHotel.css';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const AddVueloForm = () => {
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [origen, setOrigen] = useState('');
  const [vuelos, setVuelos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const vuelosPorPagina = 4; // Máximo de 4 vuelos por página

  const indiceInicio = (paginaActual - 1) * vuelosPorPagina;
  const indiceFinal = paginaActual * vuelosPorPagina;

   // Obtener los vuelos de la página actual
   const vuelosPaginaActual = vuelos.slice(indiceInicio, indiceFinal);

   // Función para cambiar de página
  const cambiarPagina = (direccion) => {
    if (direccion === 'anterior' && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else if (direccion === 'siguiente' && indiceFinal < vuelos.length) {
      setPaginaActual(paginaActual + 1);
    }
  };


  useEffect(() => {
    // Llamada a la API para obtener la lista de hoteles
    axios.get('http://localhost:8080/api/vuelos')
      .then((response) => {
        setVuelos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de vuelos:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del nuevo vuelo
    const newVuelo = {
      destino: destino,
      fecha: fecha,
      hora: hora,
      origen: origen,
    };

    console.log(newVuelo);

    // Enviar la petición POST al backend para añadir el vuelo
    axios.post('http://localhost:8080/api/vuelos', newVuelo)
      .then(response => {
        console.log('Vuelo añadido:', response.data);
        // Limpiar los campos del formulario después de añadir el vuelo
        setDestino('');
        setFecha('');
        setHora('');
        setOrigen('');
      })
      .catch(error => {
        console.error('Error al añadir el vuelo:', error);
      });
      window.location.reload();
  };

  const handleEliminar = (id) => {
    
    axios.delete('http://localhost:8080/api/vuelos/'+id)
      .then((response) => {
        console.log('Vuelo eliminado: ',response.data)
      })
      .catch((error) => {
        console.error('Error al eliminar vuelo:', error);
      });
      window.location.reload();
  };

  return (
    <div>
      <h2 id="centro">Añadir Vuelo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origen:</label>
          <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} />
        </div>
        <div>
          <label>Destino:</label>
          <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} />
        </div>
        <div>
          <label>Fecha:</label>
          <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div>
          <label>Hora:</label>
          <input type="text" value={hora} onChange={(e) => setHora(e.target.value)} />
        </div>
        <button type="submit">Añadir Vuelo</button>
      </form>
      <div id="vuelta">
        <Link to="/dashBoardAdmin" className="link-button">Volver al DashBoard</Link>
      </div>
      <h2 id="centro">Lista de Vuelos</h2>
      <ListGroup id="centro">
        {vuelosPaginaActual.map((vuelo) => (
          <ListGroup.Item key={vuelo.id}>
            Origen: {vuelo.origen} - Destino: {vuelo.destino} - Fecha: {vuelo.fecha} - Hora: {vuelo.hora}
            <br />
            <button id="boton" onClick={() => handleEliminar(vuelo.id)}>Eliminar</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div id="centro">
        <button id="boton" onClick={() => cambiarPagina('anterior')} disabled={paginaActual === 1}>
          Página anterior
        </button>
        <span>Página {paginaActual}</span>
        <button id="boton" onClick={() => cambiarPagina('siguiente')} disabled={indiceFinal >= vuelos.length}>
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default AddVueloForm;