import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'; // Importez directement votre composant App

test('renders home page on default route', () => {
  render(<App />);
  expect(screen.getByTestId('homeID')).toBeInTheDocument();
});

test('renders login page on /login route', () => {
  window.history.pushState({}, 'Login page', '/login');
  render(<App />);
  expect(screen.getByTestId('submit-login-button')).toBeInTheDocument();
});

test('renders register page on /register route', () => {
  window.history.pushState({}, 'Register page', '/register');
  render(<App />);
  expect(screen.getByTestId('sumbit-register-button')).toBeInTheDocument();
});
