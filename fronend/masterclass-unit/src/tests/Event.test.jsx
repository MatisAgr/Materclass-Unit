import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Eventlist from '../pages/Events.jsx';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

test('renders event page', async () => {
  render(
    <MemoryRouter> 
      <Eventlist />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getByTestId('event-page-title')).toBeInTheDocument();
  });
});
