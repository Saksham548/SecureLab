import React from 'react';
import { Link } from 'react-router-dom';

const Solutions = () => (
  <div className="container">
    <h2>Best Practices & Solutions</h2>
    <ul>
      <li>✅ Use parameterized queries to prevent SQL Injection  <Link to="/secure-login">Secure Login</Link> </li>
      <li>✅ Escape user input to prevent XSS <Link to="/secure-xss">Secure XSS</Link></li>
      <li>✅ Enable CSRF tokens for sensitive requests <Link to="/secure-xss">Secure XSS</Link></li>
      <li>✅ Implement strong password policies <Link to="/secure-signup">Secure Signup</Link></li>
    </ul>
  </div>
);

export default Solutions;
