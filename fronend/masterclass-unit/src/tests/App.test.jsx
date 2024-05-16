import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';

test('renders Events page on default route', () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId('event-page-title')).toBeInTheDocument();
});

test('renders login page on /login route', () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId('submit-login-button')).toBeInTheDocument();
});

test('renders register page on /register route', () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId('submit-register-button')).toBeInTheDocument();
});

// Ajoutez des tests similaires pour les autres routes