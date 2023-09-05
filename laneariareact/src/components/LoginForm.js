import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginForm.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Nombre de usuario</Form.Label>
      <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter userName" />
      <Form.Text className="text-muted">
        We'll never share your username with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Link to="/registro">Registro</Link>
  </Form>
  );
};

export default LoginForm;