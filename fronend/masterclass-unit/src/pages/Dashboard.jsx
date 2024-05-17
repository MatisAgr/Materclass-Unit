import { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import AddEventForm from '../Components/AddEvent';

export default function Dashboard() {
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0] + "T00:00";
    const [errorMessage, setErrorMessage] = useState('');
    const [dataList, setDataList] = useState([]);
    const [dataCate, setDataCate] = useState([]);
    const [events, setEvents] = useState([]);
    const [cancelledEvent, setCancelledEvent] = useState(null);
    const [cancellationReason, setCancellationReason] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/event/list');
            const dataList = await response.json();
            setDataList(dataList.Events);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/category/list');
            const dataCate = await response.json();
            setDataCate(dataCate.Categories);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const fetchCancelledEvents = useCallback(async () => {
        try {
            const response = await fetch('http://localhost/materclass-Unit/backend/api/cancel/cancel');
            const dataCancel = await response.json();
            setEvents(dataCancel.Cancels);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements annulés:', error);
        }
        // console.log(events)
    }, []);

    const handleCancelEvent = (event) => {
        setCancelledEvent(event);
    };

    const handleCancelConfirm = async () => {
        if (cancellationReason === ''){
            setErrorMessage('Veuillez entrer une raison d\'annulation');
            return;
        }
        try {
            const formDataCancel = new FormData();
            formDataCancel.append('EventId', cancelledEvent.IdEvent);
            formDataCancel.append('CancelReason', cancellationReason);
            const response = await fetch(`http://localhost/Materclass-Unit/backend/api/cancel/create`, {
                method: 'POST',
                body: formDataCancel,
            });
            const data = await response.json();
            setErrorMessage(data.status + ' Evénement annulé avec succès')

            await fetchEvents();
            await fetchCancelledEvents();

            setCancelledEvent(null);
            setCancellationReason('');

        } catch (error) {
            setErrorMessage('Erreur lors de l\'annulation de l\'événement');
        }
    };

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role !== 'admin') {
            navigate('/login');
        }
        fetchEvents();
        fetchCategories();
        fetchCancelledEvents();
    }, [navigate, fetchCancelledEvents]);

    return (
        <div>
            <div className="dashboard">
                <h2 data-testid="dashboardID"  className='dashboard-title'>Dashboard</h2>
                <AddEventForm onEventAdded={fetchEvents} dataCate={dataCate}/>
      
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
                        data-testid="eventSlots"
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
                        data-testid="eventStart"
                        type="datetime-local"
                        placeholder="Début de l'événement"
                        value={newEvent.EventStart}
                        min={today}
                        onChange={(e) => setNewEvent({ ...newEvent, EventStart: e.target.value })}
                    />
                    <input
                        data-testid="eventEnd"
                        type="datetime-local"
                        placeholder="Fin de l'événement"
                        value={newEvent.EventEnd}
                        min={today}
                        onChange={(e) => setNewEvent({ ...newEvent, EventEnd: e.target.value })}
                    />
                    <select
                        data-testid="eventCategory"
                        value={newEvent.CategoryId}
                        onChange={(e) => setNewEvent({ ...newEvent, CategoryId: e.target.value })}
                        >
                        <option value="" disabled>
                            Choisissez une catégorie
                        </option>
                        {dataCate.map((category) => (
                            <option key={category.IdEvent} value={category.IdEvent}>
                            {category.CategoryName}
                            </option>
                        ))}
                        </select>
                    <button data-testid="submit-add" onClick={handleAddEvent}>Ajouter</button>
                    <p data-testid="error-Message-Add">{MessageAdd}</p>
                </div>
                {/* <div className='event-card'>
                        <h3>Ajouter une catégorie</h3>
                        <input
                            type="text"
                            placeholder="Nom de la catégorie"
                        />
                        <button onClick={handleAddCategory}>Ajouter</button>
                </div> */}

                <section className="cards">
                    {<p></p>}
                    {cancelledEvent && (
                        <div className='cancelledEvent'>
                            <h3>Annuler l'événement "{cancelledEvent.EventDescription}"</h3>
                            <textarea
                                data-testid="cancelTextArea"
                                placeholder="Raison de l'annulation"
                                value={cancellationReason}
                                onChange={(e) => setCancellationReason(e.target.value)}
                            />
                            <button data-testid="submit-cancel" onClick={handleCancelConfirm}>Confirmer</button>
                            <button onClick={() => setCancelledEvent(null)}>Retour</button>
                        </div>
                    )}
                    {errorMessage && <p>{errorMessage}</p>}
                    <h3 data-testid="events">Événements</h3>
                    <ul className="card-container">
                    {dataList.map((event) => {
                        const category = dataCate.find(cate => cate.idCategory === event.EventCategoryId);
                        const cancelledEvent = events.find(cancel => cancel.cancel_event_id === event.IdEvent);
                        return (
                            <li key={event.IdEvent} className='card'>
                                <p>{event.EventDescription}</p>
                                <p>Places disponibles : {event.EventSlots}</p>
                                <p>Âge requis : {event.EventAgeneed}</p>
                                <p>Catégorie : {category ? category.CategoryName : 'Non trouvé'}</p>
                                <p>Début : {new Date(event.EventStart).toLocaleString()}</p>
                                <p>Fin : {new Date(event.EventEnd).toLocaleString()}</p>
                                {cancelledEvent ? (
                                    <p>Evenement Annulée : {cancelledEvent.cancel_reason}</p>
                                ) : (
                                    <button onClick={() => handleCancelEvent(event)}>
                                        Annuler
                                    </button>
                                )}
                            </li>
                        );
                    })}
                    </ul>
                </section>
            </div>
        </div>
    );
}