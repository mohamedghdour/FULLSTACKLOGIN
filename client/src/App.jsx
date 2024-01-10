import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Registre from "./components/Registre";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  async function authentificated() {
    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        method: "GET",
        headers: { token: localStorage.token }
      })
      const parseRes = await response.json()
      parseRes===true?setIsAuth(true):setIsAuth(false)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    authentificated();
  }, [])
  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              index
              path="/login"
              element={isAuth ? <Navigate to='/dashboard' /> : <Login setIsAuth={setIsAuth} />}
            />
            <Route
              path="/dashboard"
              element={!isAuth ? <Navigate to='/login' /> : <Dashboard setIsAuth={setIsAuth} />}
            />
            <Route
              path="/dashboard/ajouter-sous-Admin"
              element={!isAuth ? <Navigate to='/login' /> : <Registre />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;