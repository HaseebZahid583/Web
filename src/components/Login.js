import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/landing');
    } catch (error) {
      
      setError('Invalid email or password');
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    <h1 class="login-heading">WELCOME TO PETWORLD</h1>
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        
      </div>
    </div>
    </>
  );
};

export default Login;
