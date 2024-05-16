import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

export default function RegisterPage() {
  const Navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [userUsername, setUserUsername] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    if (userUsername === '' || userMail === '' || userPassword === '' || confirmPassword === '' || userBirth === '') {
      setErrorMessage('All fields are required.');
      return;
    }

    if (userPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      // Créer un nouvel objet Formulaire pour envoyer le bon format de données au Php
      const formData = new FormData();
      formData.append('userUsername', userUsername);
      formData.append('userMail', userMail);
      formData.append('userPassword', userPassword);
      formData.append('userBirth', userBirth);

      const response = await fetch('http://localhost/Materclass-Unit/backend/api/user/signin', {
        method: 'POST',
        body: formData
      });

      // Récupérer les données de la réponse
      const data = await response.json();

      if (response.ok) {
        // Enregistrement réussi, rediriger l'utilisateur vers la page de connexion
        console.log('User registered:', data);
        Navigate('/login');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      // console.error('Error registering useressaye :', error);
      setErrorMessage('An error occurred while registering. Please try again later.');
    }
  };

  useEffect(() => {
    if (userUsername === '' || userMail === '' || userPassword === '' || confirmPassword === '' || userBirth === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  return (
    <div className="formContainer">
      <h1>Register</h1>
      <form data-testid="register-form" id="formStyle" onSubmit={handleRegister} className="form">

        <label>
          Username:
          <input data-testid="username-input" type="text" value={userUsername} onChange={e => setUserUsername(e.target.value)} />
        </label>

        <label>
          Email:
          <input data-testid="email-input" type="email" value={userMail} onChange={e => setUserMail(e.target.value)} />
        </label>

        <label>
          Password:
          <input data-testid="password-input" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
        </label>

        <label>
          Confirm Password:
          <input data-testid="password-input-check" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </label>

        <label>
          Birth Date:
          <input data-testid="birth-input" type="date" max={today} onChange={e => setUserBirth(e.target.value)} />
        </label>

        <button className='formbutton' data-testid="submit-register-button" type="submit" disabled={disabled}>Register</button>
        <p data-testid="error-message">{errorMessage}</p>
        <Link data-testid="login-link" to="/login">Login</Link>

      </form>
    </div>
  );
}