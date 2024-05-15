import React, { useState, useEffect } from 'react';

import './Form.css';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = event => {
    event.preventDefault();

    if (username === '' || email === '' || password === '' || confirmPassword === '' || birthDate === '') {
      setErrorMessage('All fields are required.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (username === '' || email === '' || password === '' || confirmPassword === '' || birthDate === '') {
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
          <input data-testid="username-input" type="text" value={username} onChange={e => setUsername(e.target.value)}  />
        </label>

        <label>
          Email:
          <input data-testid="email-input" type="email" value={email} onChange={e => setEmail(e.target.value)}  />
        </label>

        <label>
          Password:
          <input data-testid="password-input" type="password" value={password} onChange={e => setPassword(e.target.value)}  />
        </label>

        <label>
          Confirm Password:
          <input data-testid="password-input-check" type="password"  onChange={e => setConfirmPassword(e.target.value)}  />
        </label>

        <label>
          Birth Date:
          <input data-testid="birth-input" type="date" onChange={e => setBirthDate(e.target.value)}  />
        </label>

        <button className='formbutton' data-testid="sumbit-register-button" type="submit" disabled={disabled}>Register</button>
        <p data-testid="error-message">{errorMessage}</p>
        <Link data-testid="login-link" to="/login">Login</Link>

      </form>
    </div>
  );
}



