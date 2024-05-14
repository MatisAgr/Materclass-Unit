import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    dates: [],
    capacity: '',
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
      setNewEvent({ title: '', type: '', dates: [], capacity: '' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
    }
  };

  const handleCancelEvent = (event) => {
    setCancelledEvent(event);
  };

  const handleCancelConfirm = async () => {
    try {
      const response = await fetch(`/api/events/${cancelledEvent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cancelled: true, cancellationReason }),
      });
      const data = await response.json();
      setEvents(events.map((event) => (event.id === data.id ? data : event)));
      setCancelledEvent(null);
      setCancellationReason('');
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'événement:', error);
    }
  };

  const handleDateChange = (date) => {
    const isDateSelected = newEvent.dates.includes(date);
    const updatedDates = isDateSelected
      ? newEvent.dates.filter((d) => d !== date)
      : [...newEvent.dates, date];
    setNewEvent({ ...newEvent, dates: updatedDates });
  };

  return (
    <div>
      <Header />
      <div className="dashboard">
        <h2>Tableau de bord</h2>
        {cancelledEvent && (
          <div>
            <h3>Annuler l'événement "{cancelledEvent.title}"</h3>
            <textarea
              placeholder="Raison de l'annulation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
            <button onClick={handleCancelConfirm}>Confirmer</button>
            <button onClick={() => setCancelledEvent(null)}>Annuler</button>
          </div>
        )}
        <div>
          <h3>Ajouter un événement</h3>
          <input
            type="text"
            placeholder="Titre de l'événement"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Nombre de places"
            value={newEvent.capacity}
            onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
          />
          <button onClick={handleAddEvent}>Ajouter</button>
        </div>
        <div>
          <h3>Événements</h3>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <span>{event.title}</span>
                <span>Type : {event.type}</span>
                <span>
                  Dates :
                  {event.dates.map((date, index) => (
                    <span key={index}>{date}</span>
                  ))}
                </span>
                <span>Places disponibles : {event.capacity}</span>
                {event.cancelled && <span>Annulé : {event.cancellationReason}</span>}
                <button onClick={() => handleCancelEvent(event)}>
                  {event.cancelled ? 'Annulé' : 'Annuler'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}