import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard', () => {
    let eventDescription, eventAge, errorMessageAdd, submitButton;

    beforeEach(() => {
    render(
        <MemoryRouter>
        <Dashboard />
        </MemoryRouter>
    );

    eventDescription = screen.getByTestId('eventDescription');
    eventAge = screen.getByTestId('eventAge');
    // eventCategory = screen.getByTestId('eventCategory');
    errorMessageAdd = screen.getByTestId('error-Message-Add');
    submitButton = screen.getByTestId('submit-add');
    });

    test('renders Dashboard page', () => {
    expect(eventDescription).toBeInTheDocument();
    expect(eventAge).toBeInTheDocument();
    // expect(eventCategory).toBeInTheDocument();
    });

    /* test('should display error message when error on adding a new event', async () => {
        expect(eventDescription).toHaveValue('');
        // expect(eventCategory).toHaveValue('');
        expect(eventAge).toHaveValue('');
        expect(submitButton).toBeInTheDocument();

        // Simuler le clic sur le bouton d'ajout d'un événement
        fireEvent.click(submitButton);

        // Attendre que le message d'erreur soit affiché
        await waitFor(() => {
            expect(errorMessageAdd).toHaveTextContent('Erreur lors de l\'ajout de l\'événement');
        });
    }); */
});