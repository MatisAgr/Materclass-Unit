import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useState, useEffect } from 'react';

import './Dashboard.css';

export default function Dashboard() {
    const eventsData = [
        {
            IdEvent: 1,
            EventDescription: 'Concert',
            EventSlots: 100,
            EventAgeneed: '18',
            EventCategoryId: 1,
            EventStart: '2024-05-20T10:00:00Z',
            EventEnd: '2024-05-20T12:00:00Z'
        },
        {
            IdEvent: 2,
            EventDescription: 'Coupe du monde',
            EventSlots: 50,
            EventAgeneed: '18',
            EventCategoryId: 2,
            EventStart: '2024-06-15T14:00:00Z',
            EventEnd: '2024-06-15T16:00:00Z'
        },
        {
            IdEvent: 3,
            EventDescription: 'MSI',
            EventSlots: 300,
            EventAgeneed: 'Enfants',
            EventCategoryId: 3,
            EventStart: '2024-07-10T09:00:00Z',
            EventEnd: '2024-07-10T11:00:00Z'
        },
        {
            IdEvent: 4,
            EventDescription: 'Five',
            EventSlots: 200,
            EventAgeneed: 'Enfants',
            EventCategoryId: 3,
            EventStart: '2024-07-10T09:00:00Z',
            EventEnd: '2024-07-10T11:00:00Z'
        }
    ];
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        EventDescription: '',
        EventSlots: '',
        EventAgeneed: '',
        EventCategoryId: '',
        EventStart: '',
        EventEnd: ''
    });
    const [cancelledEvent, setCancelledEvent] = useState(null);
    const [cancellationReason, setCancellationReason] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            const data = await response.json();
            setEvents([...events, data]);
            setNewEvent({
                EventDescription: '',
                EventSlots: '',
                EventAgeneed: '',
                EventCategoryId: '',
                EventStart: '',
                EventEnd: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'événement:', error);
        }
    };

    const handleCancelEvent = (event) => {
        setCancelledEvent(event);
    };

    const handleCancelConfirm = async () => {
        try {
            const response = await fetch(`/api/events/${cancelledEvent.IdEvent}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cancelled: true, cancellationReason }),
            });
            const data = await response.json();
            setEvents(events.map((event) => (event.IdEvent === data.IdEvent ? data : event)));
            setCancelledEvent(null);
            setCancellationReason('');
        } catch (error) {
            console.error('Erreur lors de l\'annulation de l\'événement:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="dashboard">
                <h2>Dashboard</h2>
                <div className='event-card'>
                    <h3>Ajouter un événement</h3>
                    <input
                        type="text"
                        placeholder="Description de l'événement"
                        value={newEvent.EventDescription}
                        onChange={(e) => setNewEvent({ ...newEvent, EventDescription: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Nombre de places"
                        value={newEvent.EventSlots}
                        onChange={(e) => setNewEvent({ ...newEvent, EventSlots: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Age requis"
                        value={newEvent.EventAgeneed}
                        onChange={(e) => setNewEvent({ ...newEvent, EventAgeneed: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Catégorie ID"
                        value={newEvent.EventCategoryId}
                        onChange={(e) => setNewEvent({ ...newEvent, EventCategoryId: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Début de l'événement"
                        value={newEvent.EventStart}
                        onChange={(e) => setNewEvent({ ...newEvent, EventStart: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Fin de l'événement"
                        value={newEvent.EventEnd}
                        onChange={(e) => setNewEvent({ ...newEvent, EventEnd: e.target.value })}
                    />
                    <button onClick={handleAddEvent}>Ajouter</button>
                </div>
                <section className="cards">
                {cancelledEvent && (
                    <div>
                        <h3>Annuler l'événement "{cancelledEvent.EventDescription}"</h3>
                        <textarea
                            placeholder="Raison de l'annulation"
                            value={cancellationReason}
                            onChange={(e) => setCancellationReason(e.target.value)}
                        />
                        <button onClick={handleCancelConfirm}>Confirmer</button>
                        <button onClick={() => setCancelledEvent(null)}>Annuler</button>
                    </div>
                )}
                <h3>Événements</h3>
                <div className="card-container">
                    {eventsData.map((event) => (
                        <ul key={event.IdEvent} className="card">
                            <li>{event.EventDescription}</li>
                            <li>Places disponibles : {event.EventSlots}</li>
                            <li>Âge requis : {event.EventAgeneed}</li>
                            <li>Catégorie ID : {event.EventCategoryId}</li>
                            <li>Début : {new Date(event.EventStart).toLocaleString()}</li>
                            <li>Fin : {new Date(event.EventEnd).toLocaleString()}</li>
                            <button onClick={() => handleCancelEvent(event)}>
                                {event.cancelled ? 'Annulé' : 'Annuler'}
                            </button>
                        </ul>
                    ))}
                </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
