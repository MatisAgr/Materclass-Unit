import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateUsername, validateEmail, validatePassword, validateMatchingPassword } from '../Components/SecurityCheck';
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

     // Check that all fields are filled
     if (userUsername === '' || userMail === '' || userPassword === '' || confirmPassword === '' || userBirth === '') {
      setErrorMessage('All fields are required.');
      return;
    }

    // Check Username
    if (!validateUsername(userUsername)) {
      setErrorMessage('Username can only contain letters, hyphens, and apostrophes.');
      return;
    }

    // Check Password match
    if (!validateMatchingPassword(userPassword, confirmPassword)) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check Email
    if (!validateEmail(userMail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Check Password strength
    if (!validatePassword(userPassword)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one number, one lowercase letter, and one uppercase letter.');
      return;
    }

    try {
      // Create a new Form object to send the correct data format to Php
      const formData = new FormData();
      formData.append('userUsername', userUsername);
      formData.append('userMail', userMail);
      formData.append('userPassword', userPassword);
      formData.append('userBirth', userBirth);

      const response = await fetch('http://localhost/Materclass-Unit/backend/api/user/signin', {
        method: 'POST',
        body: formData
      });

      // Retrieve the data from the response
      const data = await response.json();

      if (response.ok) {
        // Successful registration, redirect the user to the login page
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
  }, [userUsername, userMail, userPassword, confirmPassword, userBirth]);

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
          <input data-testid="password-input" type="password" value={userPassword} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" placeholder='Mot de passe fort requis' title='8 caractères dont 1 lettre, 1 chiffre, 1 caractères spécial' onChange={e => setUserPassword(e.target.value)} />
        </label>

        <label>
          Confirm Password:
          <input data-testid="password-input-check" type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" placeholder='Mot de passe fort requis' title='8 caractères dont 1 lettre, 1 chiffre, 1 caractères spécial' onChange={e => setConfirmPassword(e.target.value)} />
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