import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Form.css'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [userMail, setMail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userMail === '' && userPassword === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
        formData.append('userMail', userMail);
        formData.append('userPassword', userPassword);

      const response = await fetch('http://localhost/Materclass-Unit/backend/api/user/login', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        // Connexion réussie
        localStorage.setItem('userId', data.Session.Id);
        localStorage.setItem('userRole', data.Session.Role);
        navigate('/')
      } else {
        // Échec de la connexion
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Une erreur s\'est produite lors de la connexion.');
    }
  };

  return (
    <div>
      <section>
        <h1>Login</h1>
        <form id="formStyle" data-testid="login-form" onSubmit={handleLogin}>
          <label>
            Email:
            <input data-testid="userMail-input" type="text" value={userMail} onChange={e => setMail(e.target.value)} />
          </label>
          <label>
            Password:
            <input data-testid="password-input" type="password" value={userPassword} onChange={e => setPassword(e.target.value)} />
          </label>
          <button data-testid="submit-login-button" className='formbutton' type="submit" disabled={disabled}>Login</button>
          <p data-testid="error-message">{errorMessage}</p>
          <Link data-testid="register-link" to="/register">Register</Link>
        </form>
      </section>
    </div>
  );
}
