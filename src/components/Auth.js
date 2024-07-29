import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css'; // Ensure you create this CSS file for styling

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {isLogin ? <Login /> : <Signup />}
      </div>
      <button
        className="switch-button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Signup' : 'Go To Login'}
      </button>
    </div>
  );
};

export default Auth;
 