import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Dashboard({ setIsAuth }) {
  const [information, setInformation] = useState([]);


  async function getInformation() {
    try {
      const response = await fetch('http://localhost:4000/dashboard/', {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const res = await response.json();

      setInformation(res);

    } catch (err) {
      console.error(err.message);

    }
  }

  useEffect(() => {
    getInformation();
  }, []);
  const LogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token')
    setIsAuth(false)
  }
  return (
    <div>
      <h1>Dashboard</h1>

      {information.map((ele) =>
        <>
          <h2>hello MR.{ele.nom} {ele.prenom}  </h2>
          <div>
            {ele.grade === 'admin'
              &&
              <NavLink to="/dashboard/ajouter-sous-Admin">
                <button className="btn btn-success" >Ajouter +</button>
              </NavLink>}
            <NavLink to="/login">
              <button onClick={LogOut} className="btn btn-danger">
                log out
              </button>
            </NavLink>
          </div></>
      )}

    </div>
  );
}

export default Dashboard;
