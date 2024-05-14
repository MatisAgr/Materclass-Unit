import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    console.log('Login :', username, password);
    // Ajouter la logique du login ici 
  };

  return (
    <div>
      <Header />
      <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      </section>
      <Footer />
    </div>
  );
}

export default LoginPage;
