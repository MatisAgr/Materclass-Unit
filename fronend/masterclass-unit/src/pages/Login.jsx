import React, { useState } from 'react';
import './Login.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (username === '' && password === '' || username === '' || password === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const errorMessage = document.getElementById('error-message');
    if (username === '' && password === '' || username === '' || password === '') {
      setErrorMessage('Enter valid credentials to login.');
    } else {
      setErrorMessage('');
    }
  };



  return (
    <div>
      <section>
        <h1>Login</h1>
        <form id="loginForm" data-testid="login-form" onSubmit={handleLogin}>
          <label>
            Username:
            <input data-testid="username-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input data-testid="password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button data-testid="submit-login-button" className="loginButton" type="submit">Login</button>
          <p data-testid="error-message">{errorMessage}</p>
          <Link data-testid="register-link" to="/register">Register</Link>
        </form>
      </section>
    </div>
  );
}


export default LoginPage;

