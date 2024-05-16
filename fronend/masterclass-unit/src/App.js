import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Events />
          <Footer />
          </>} />
        <Route path="/login" element={
          <>
          <Header />
          <LoginPage />
          <Footer />
          </>} />
        <Route path="/register" element={<>
          <Header />
          <RegisterPage />
          <Footer />
          </>} />
        <Route path="/dashboard" element={<>
          <Header />
          <Dashboard />
          <Footer />
          </>} />
        <Route path="/profile" element={<>
          <Header />
          <ProfilePage />
          <Footer />
          </>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </Router>
  );
}

export default App;
