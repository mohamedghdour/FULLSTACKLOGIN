// React component

import React, { useState } from 'react';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

function Login({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password }
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const parseRes = await response.json()
      if (response.ok) {
        localStorage.setItem("token", parseRes.token)
        setIsAuth(true)
      } else {
        setErrors("invalid email or password");
      }
    } catch (err) {
      console.error(err.message)
    }
  };

  return (
    <div className="container mt-5">
      <div className='divlogo'><img  className='pnglogo' src="./logo.png" alt="logo" /></div>
      <div className="login-container">
      <div className="col-md-12 form">
          <form onSubmit={handleLogin}>
            <h2 style={{textAlign: "start",display: "flex" , color: "#10B981", textShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)"}} className="text mb-4"><span class="dot"></span>Login</h2>
            <div className="mb-3">
              <div className='input-group' >
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="USER-EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon className='user' icon={faUser} />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="USER-PASSWORD"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="check"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  
                </button>
              </div>
              
            </div>
      {errors.length>0 && (
        <div className="text-danger mb-1" role="alert">
          {errors }
        </div>
      )}
            <button type="submit" className="btn-login">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
