// React component

import React, { useState } from 'react';

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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin}>
            <h2 className="text-center mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              
            </div>
      {errors.length>0 && (
        <div className="text-danger mb-1" role="alert">
          {errors }
        </div>
      )}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
