import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AddHotel.css';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const vuelosPorPagina = 4; // Máximo de 4 vuelos por página

  const indiceInicio = (paginaActual - 1) * vuelosPorPagina;
  const indiceFinal = paginaActual * vuelosPorPagina;

   // Obtener los vuelos de la página actual
   const usuariosPaginaActual = users.slice(indiceInicio, indiceFinal);

   // Función para cambiar de página
  const cambiarPagina = (direccion) => {
    if (direccion === 'anterior' && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else if (direccion === 'siguiente' && indiceFinal < users.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener la lista de usuarios
    axios.get('http://localhost:8080/apirest/all')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del nuevo usuarios
    const newUser = {
        name: name,
        password: password,
      };

    // Enviar la petición POST al backend para añadir el usuario
    axios.post('http://localhost:8080/apirest/save', newUser)
      .then(response => {
        console.log('Usuario añadido:', response.data);
        // Limpiar los campos del formulario después de añadir el usuario
        setName('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error al añadir el usuario:', error);
      });
      window.location.reload();
  };

  const handleEliminar = (id) => {
    
    axios.delete('http://localhost:8080/apirest/'+id)
      .then((response) => {
        console.log('usuario eliminado: ',response.data)
      })
      .catch((error) => {
        console.error('Error al eliminar usuario:', error);
      });
      window.location.reload();
  };

  return (
    <div>
      <h2 id="centro">Añadir Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Añadir Usuario</button>
      </form>
      <div id="vuelta">
        <Link to="/dashBoardAdmin" className="link-button">Volver al DashBoard</Link>
      </div>
      <h2 id="centro">Lista de Usuarios</h2>
      <ListGroup id="centro">
        {usuariosPaginaActual.map((user) => (
          <ListGroup.Item key={user.id}>
            Nombre: {user.name}
            <br />
            <button id="boton" onClick={() => handleEliminar(user.id)}>Eliminar</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div id="centro">
        <button id="boton" onClick={() => cambiarPagina('anterior')} disabled={paginaActual === 1}>
          Página anterior
        </button>
        <span>Página {paginaActual}</span>
        <button id="boton" onClick={() => cambiarPagina('siguiente')} disabled={indiceFinal >= users.length}>
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;