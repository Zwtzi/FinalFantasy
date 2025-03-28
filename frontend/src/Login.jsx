// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
  
      const data = await response.json();
  
      // Almacenar la información del usuario en el contexto de autenticación
      const userData = { username, tipo: data.tipo };
      login(userData);
  
      // Redirigir según el tipo de usuario
      if (data.tipo === 'alumno') {
        navigate('/alumnodashboard');
      } else if (data.tipo === 'maestro') {
        navigate('/profesordashboard');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.message);
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
