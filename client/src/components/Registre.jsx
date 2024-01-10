import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Registre = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [numero_de_telephone, setNumero_de_telephone] = useState(''); // Corrected variable name
    const [grade, setGrade] = useState('admin');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { nom, prenom, email, password, numero_de_telephone, grade };
            const response = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            console.log(parseRes);
            localStorage.setItem('token',parseRes.token)
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className='text-center my-5'>Ajouter un sous-admins</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numero_de_telephone" className="form-label">Numéro de téléphone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="numero_de_telephone"
                        value={numero_de_telephone}
                        onChange={(e) => setNumero_de_telephone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">Grade</label>
                    <select
                        className="form-control"
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="sous-admin">Sous-admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Soumettre</button>
            </form>
        </Fragment>
    );
};

export default Registre;
