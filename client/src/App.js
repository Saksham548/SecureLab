import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Solutions from './pages/Solutions';
import XSS from './pages/XSS';
import './style.css';
import Profile from './pages/IDOR';
import SecureLogin from './pages/SecureLogin';
import SecureXSS from './pages/SecureXSS';
import  Signup  from './pages/SecureSignup';
import { Toaster } from 'react-hot-toast';

const App = () => (
  <Router>
    <Navbar />
    <div className="main-content">
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/xss" element={<XSS />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/secure-login" element={<SecureLogin />} />
        <Route path="/secure-xss" element={<SecureXSS />} />
        <Route path="/secure-signup" element={<Signup />} />

      </Routes>
    </div>
  </Router>
);

export default App;
