import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Solutions from './pages/Solutions';
import XSS from './pages/XSS';
import './style.css';
import Profile from './pages/IDOR';

const App = () => (
  <Router>
    <Navbar />
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/xss" element={<XSS />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </div>
  </Router>
);

export default App;
