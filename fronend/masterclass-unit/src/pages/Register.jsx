import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

export default function RegisterPage() {
  const [userUsername, setUserUsername] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [newUser, setNewUser] = useState({
    userUsername: '',
    userMail: '',
    userPassword: '',
    userBirth: ''
  });

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
    // console.log(userUsername, userMail, userPassword, confirmPassword, userBirth)
    try {
      const formData = new FormData();
        formData.append('userUsername', userUsername);
        formData.append('userMail', userMail);
        formData.append('userPassword', userPassword);
        formData.append('userBirth', userBirth);

      const response = await fetch('http://localhost/Materclass-Unit/backend/api/user/signin', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Enregistrement réussi, rediriger l'utilisateur vers la page de connexion
        console.log('User registered:', data);
      } else {
        // Afficher le message d'erreur de l'API
        setErrorMessage(data.message);
      }
    } catch (error) {
      // Gérer les erreurs lors de l'envoi de la requête
      console.error('Error registering user:', error);
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
      <form data-testid="login-form" id="formStyle" onSubmit={handleRegister} className="form">

        <label>
          Username:
          <input data-testid="userUsername-input" type="text" value={userUsername} onChange={e => setUserUsername(e.target.value)}  />
        </label>

        <label>
          Email:
          <input data-testid="userMail-input" type="userMail" value={userMail} onChange={e => setUserMail(e.target.value)}  />
        </label>

        <label>
          Password:
          <input data-testid="userPassword-input" type="userPassword" value={userPassword} onChange={e => setUserPassword(e.target.value)}  />
        </label>

        <label>
          Confirm Password:
          <input data-testid="userPassword-input-check" type="userPassword"  onChange={e => setConfirmPassword(e.target.value)}  />
        </label>

        <label>
          Birth Date:
          <input data-testid="birth-input" type="date" onChange={e => setUserBirth(e.target.value)}  />
        </label>

        <button className='formbutton' data-testid="sumbit-register-button" type="submit" disabled={disabled}>Register</button>
        <p data-testid="error-message">{errorMessage}</p>
        <Link data-testid="login-link" to="/login">Login</Link>

      </form>
    </div>
  );
}



