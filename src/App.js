import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/landing" /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
