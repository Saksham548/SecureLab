import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios'; // Used to send data to your backend

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [uppercase, setUppercase] = useState(false);
  const [lowcase, setLowcase] = useState(false);
  const [special, setSpecial] = useState(false);
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(false);

  useEffect(() => {
    function containsLowerCaseCharacter(inputString) {
      return /[a-z]/.test(inputString);
    }
    function containsUpperCaseCharacter(inputString) {
      return /[A-Z]/.test(inputString);
    }
    function containsSpecialCharacter(inputString) {
      var regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
      return regex.test(inputString)
    }
    function containsNumber(inputString) {
      var regex = /\d/;
      return regex.test(inputString)
    }

    if (containsLowerCaseCharacter(password)) setLowcase(true);
    else setLowcase(false);

    if (containsUpperCaseCharacter(password)) setUppercase(true);
    else setUppercase(false);

    if (containsSpecialCharacter(password)) setSpecial(true);
    else setSpecial(false);

    if (containsNumber(password)) setNumber(true);
    else setNumber(false);

    if (password.length >= 8) setLength(true);
    else setLength(false);
  }, [password]);

  const createAccount = () => {
    if (uppercase && lowcase && special && number && length) {
      // Send data to backend
      axios.post('http://localhost:5000/signup', { email, password })
        .then(response => {
          toast.success("Signed Up");
        })
        .catch(err => {
          toast.error("Error occurred: " + err.response.data.message);
        });
    } else {
      toast.error("Email or Password criteria failed");
    }
  };

  return (
    <div className='secure-container'>
      <h1>Sign Up</h1>

      <div className='input-group'>
        <label htmlFor='Email'>Email</label>
        <input 
          id='Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email' 
          type="email" 
        />
      </div>

      <div className='input-group'>
        <label htmlFor='Password'>Password</label>
        <div className='password-container'>
          <input 
            id='Password' 
            value={password} 
            type={show ? "text" : "password"} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
          />
          <span onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</span>
        </div>
      </div>

      <div className='password-requirements'>
        <ul>
          <li className={lowcase ? "valid" : ""}>One lowercase character</li>
          <li className={uppercase ? "valid" : ""}>One uppercase character</li>
          <li className={special ? "valid" : ""}>One special character</li>
          <li className={number ? "valid" : ""}>One number</li>
          <li className={length ? "valid" : ""}>8 characters minimum</li>
        </ul>
      </div>

      <button onClick={createAccount}>Sign Up</button>
    </div>
  );
}
