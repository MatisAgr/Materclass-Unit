import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Events from './pages/Events';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
      </Routes>
    <Footer />
    </>
  );
}

export default App;
