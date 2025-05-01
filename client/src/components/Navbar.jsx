import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">🔐 SecureLab</div>
    <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/xss">XSS Demo</Link>
      <Link to="/solutions">Solutions</Link>
      <Link to="/secure-signup">SignUp</Link>
    </div>
  </nav>
);

export default Navbar;
