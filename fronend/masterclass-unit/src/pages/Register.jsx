import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = event => {
    event.preventDefault();
    console.log('Register :', username, email, password);
    // Ajouter la logique du login ici 
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleRegister} className="form">
        <label className="label">
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input" />
        </label>
        <label className="label">
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
        </label>
        <label className="label">
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
        </label>
        <button type="submit" className="registerButton">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
