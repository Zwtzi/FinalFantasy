import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';  // Importa la función login desde api.js

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook de React Router para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();  // Evitar la recarga de la página
  
    try {
      const data = await login(username, password);
  
      if (data.tipo === 'alumno') {
        navigate('/alumnodashboard');  // Redirigir a la vista de alumno
      } else if (data.tipo === 'maestro') {
        navigate('/profesordashboard');  // Redirigir a la vista de profesor
      }
    } catch (error) {
      alert(error.message);  // Mostrar un mensaje de error en caso de que el login falle
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
}

export default Login;
