import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = event => {
    event.preventDefault();
    console.log('Register :', username, email, password);
  };

  return (
    <div>
      <Header />
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <Footer />
    </div>
  );
}

export default RegisterPage;
