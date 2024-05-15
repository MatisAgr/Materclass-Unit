import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard', () => {
  let eventDescription, eventAge, eventCategory, errorMessageAdd, submitButton;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    eventDescription = screen.getByTestId('eventDescription');
    eventAge = screen.getByTestId('eventAge');
    eventCategory = screen.getByTestId('eventCategory');
    errorMessageAdd = screen.getByTestId('error-Message-Add');
    submitButton = screen.getByTestId('submit-add');
  });

  test('renders Dashboard page', () => {
    expect(eventDescription).toBeInTheDocument();
    expect(eventAge).toBeInTheDocument();
    expect(eventCategory).toBeInTheDocument();
  });

  /* test('should display error message when cancel reason is empty', async () => {
    
    // Simule le clic sur le bouton d'annulation du premier événement
    const cancelButtons = screen.getAllByText('Annuler');
    fireEvent.click(cancelButtons[0]);

    // Simule l'entrée d'une raison vide pour l'annulation
    const cancelTextArea = screen.getByTestId('cancelTextArea');
    fireEvent.change(cancelTextArea, { target: { value: '' } });

    // Simule le clic sur le bouton de confirmation d'annulation
    const submitCancel = screen.getByTestId('submit-cancel');
    fireEvent.click(submitCancel);

    // Vérifie que le message d'erreur s'affiche
    await waitFor(() => {
      const errorMessage = screen.getByText('Veuillez entrer une raison d\'annulation');
      expect(errorMessage).toBeInTheDocument();
    });
  }); */

  /* test('should display error message when error on adding a new event', async () => {
    expect(eventDescription).toHaveValue('');
    expect(eventCategory).toHaveValue('');
    expect(eventAge).toHaveValue('');
    expect(submitButton).toBeInTheDocument();

    // Simuler le clic sur le bouton d'ajout d'un événement
    fireEvent.click(screen.getByTestId('submit-add'));

    // Attendre que le message d'erreur soit affiché
    await waitFor(() => {
      expect(errorMessageAdd).toHaveTextContent('Erreur lors de l\'ajout de l\'événement');
    });
  }); */
});