import React from 'react';
import { render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard', () => {
    let eventDescription, eventAge, eventCategory;

    beforeEach(() => {
        act(() => {
            render(
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            );
        })
            eventDescription = screen.getByTestId('eventDescription');
            eventAge = screen.getByTestId('eventAge');
            eventCategory = screen.getByTestId('eventCategory');
    });

    test('renders Dashboard page', () => {
        expect(eventDescription).toBeInTheDocument();
        expect(eventAge).toBeInTheDocument();
        expect(eventCategory).toBeInTheDocument();
    });
})
