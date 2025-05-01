// SecureLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SecureLogin = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/secure-login', data)
    .then(res => {
      // handle login success
      toast.success("Login Successfull");
      setMsg("Welcome User")

    })
    .catch(err => {
      if (err.response && err.response.status === 429) {
        toast.error(err.response.data); // "Too many login attempts. Please try again later."
      } else {
        toast.error('Login failed');
      }
    });
  
  };



  return (
    <div className="secure-container">
      <h2>Secure Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input type="password" placeholder="Password" required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default SecureLogin;
