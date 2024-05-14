import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import EventList from './pages/Events';

// Mocking the fetch function
global.fetch = jest.fn().mockResolvedValue({
  json: () => Promise.resolve([
    {
      id: 1,
      name: 'Event 1',
      desc: 'Description of event 1',
      start: '2024-05-15',
      end: '2024-05-16',
      slots: 100,
      ageneed: '18+',
      category: 'Concert'
    },
    {
      id: 2,
      name: 'Event 2',
      desc: 'Description of event 2',
      start: '2024-05-17',
      end: '2024-05-18',
      slots: 50,
      ageneed: '21+',
      category: 'Conference'
    }
  ])
});

describe('EventList Component', () => {
  test('renders event list with correct data', async () => {
    const { getByText } = render(<EventList />);

    // Wait for fetch to resolve and component to update
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if events are rendered correctly
    expect(getByText('Event 1')).toBeInTheDocument();
    expect(getByText('Description : Description of event 1')).toBeInTheDocument();
    expect(getByText('Start Date : 2024-05-15')).toBeInTheDocument();
    expect(getByText('End Date : 2024-05-16')).toBeInTheDocument();
    expect(getByText('Slots : 100')).toBeInTheDocument();
    expect(getByText('Age Requirement : 18+')).toBeInTheDocument();
    expect(getByText('Category ID : Concert')).toBeInTheDocument();

    expect(getByText('Event 2')).toBeInTheDocument();
    expect(getByText('Description : Description of event 2')).toBeInTheDocument();
    expect(getByText('Start Date : 2024-05-17')).toBeInTheDocument();
    expect(getByText('End Date : 2024-05-18')).toBeInTheDocument();
    expect(getByText('Slots : 50')).toBeInTheDocument();
    expect(getByText('Age Requirement : 21+')).toBeInTheDocument();
    expect(getByText('Category ID : Conference')).toBeInTheDocument();
  });
  
  test('renders error message if fetching events fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    const { getByText } = render(<EventList />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(getByText('Error fetching events: Failed to fetch')).toBeInTheDocument();
  });
  test('renders with empty event list initially', () => {
    const { getByText } = render(<EventList />);
  
    expect(getByText('Upcoming Events')).toBeInTheDocument();
    expect(getByText('No events found.')).toBeInTheDocument();
  });
  
});

