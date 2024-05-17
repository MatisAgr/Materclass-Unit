import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
    let eventDescription, eventSlots, eventAge, eventStart, eventEnd, eventCategory;

    /****Prepare ****/
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        eventDescription = screen.getByTestId('eventDescription');
        eventSlots = screen.getByTestId('eventSlots');
        eventAge = screen.getByTestId('eventAge');
        eventStart = screen.getByTestId('eventStart');
        eventEnd = screen.getByTestId('eventEnd');
        eventCategory = screen.getByTestId('eventCategory');
    });

    /***************** Test for rendering of dashboard page *****************/
    test('renders dashboard page', () => {
        expect(eventDescription).toBeInTheDocument();
        expect(eventSlots).toBeInTheDocument();
        expect(eventAge).toBeInTheDocument();
        expect(eventStart).toBeInTheDocument();
        expect(eventEnd).toBeInTheDocument();
        expect(eventCategory).toBeInTheDocument();
    });

    /***************** Test for initial state of dashboard fields *****************/
    test('should render dashboard with initial state', () => {
        expect(eventDescription).toHaveTextContent('');
        expect(eventSlots).toHaveValue(null);
        expect(eventAge).toHaveTextContent('');
        expect(eventStart).toHaveTextContent('');
        expect(eventEnd).toHaveTextContent('');
    });

    /***************** Test for input field binding *****************/
    test('should render dashboard with event details', async () => {

        fireEvent.change(eventDescription, { target: { value: 'eventDescriptionTest' } });
        fireEvent.change(eventSlots, { target: { value: 200 } });
        fireEvent.change(eventAge, { target: { value: 'eventAgeTest' } });
        fireEvent.change(eventStart, { target: { value: '1950-01-01T00:00' } });
        fireEvent.change(eventEnd, { target: { value: '1959-01-01T00:00' } });

        await waitFor(() => {
            expect(eventDescription).toHaveValue('eventDescriptionTest');
            expect(eventSlots).toHaveValue(200);
            expect(eventAge).toHaveValue('eventAgeTest');
            expect(eventStart).toHaveValue('1950-01-01T00:00');
            expect(eventEnd).toHaveValue('1959-01-01T00:00');
        });



    });





});