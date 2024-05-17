import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Events from './pages/Events';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Logout from './Components/Logout';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    <Footer />
    </>
  );
}

export default App;
