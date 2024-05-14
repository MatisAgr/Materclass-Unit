import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useState, useEffect } from 'react';

import './Dashboard.css';

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [dataList, setDataList] = useState([]);
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
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/event/list');
            const dataList = await response.json();
            setDataList(dataList.Events);
            console.log(dataList.Events);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/event/create', {
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
                <h2 data-testid="dashboardID">Dashboard</h2>
                <div className='event-card'>
                    <h3>Ajouter un événement</h3>
                    <input
                        data-testid="eventDescription"
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
                        data-testid="eventAge"
                        type="text"
                        placeholder="Age requis"
                        value={newEvent.EventAgeneed}
                        onChange={(e) => setNewEvent({ ...newEvent, EventAgeneed: e.target.value })}
                    />
                    <input
                        data-testid="eventCategory"
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
                    <div className='cancelledEvent'>
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
                <h3 data-testid="events">Événements</h3>
                <div className="card-container">
                    {dataList.map((event) => (
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
