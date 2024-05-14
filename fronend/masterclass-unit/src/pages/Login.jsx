import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Login.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    console.log('Login :', username, password);
    // Ajouter la logique du login ici 
  };

  return (
    <div className="formContainer">
      <Header />
      <section>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form">
          <label className="label">
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input" />
          </label>
          <label className="label">
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
          </label>
          <button type="submit" className="loginButton">Login</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default LoginPage;