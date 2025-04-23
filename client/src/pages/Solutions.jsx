import React from 'react';

const Solutions = () => (
  <div className="container">
    <h2>Best Practices & Solutions</h2>
    <ul>
      <li>✅ Use parameterized queries to prevent SQL Injection</li>
      <li>✅ Escape user input to prevent XSS</li>
      <li>✅ Enable CSRF tokens for sensitive requests</li>
      <li>✅ Implement strong password policies</li>
    </ul>
  </div>
);

export default Solutions;
