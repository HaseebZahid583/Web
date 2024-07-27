import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password });
      localStorage.setItem('token', response.data.token);
    
      window.location.href = '/';
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Signup</button>
          
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
