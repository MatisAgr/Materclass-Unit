import { useState, useEffect } from 'react';

import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0] + "T00:00";
    // const [categories, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [MessageAdd, setMessageAdd] = useState('');
    const [events, setEvents] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [dataCate, setDataCate] = useState([]);
    const [newEvent, setNewEvent] = useState({
        EventDescription: '',
        EventSlots: '',
        EventAgeneed: '',
        CategoryId: '',
        EventStart: '',
        EventEnd: '',
        errorMessageAdd: ''
    });
    const [cancelledEvent, setCancelledEvent] = useState(null);
    const [cancellationReason, setCancellationReason] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        // console.log(role)
        if (role !== 'admin') {
            navigate('/login');
        }
        fetchEvents();
        fetchCategories();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/event/list');
            const dataList = await response.json();
            setDataList(dataList.Events);
            // console.log(dataList.Events);
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

    const handleAddEvent = async () => {
        try {
            // Créer un nouvel objet Formulaire pour envoyer le bon format de données au Php
            const formData = new FormData();
            formData.append('EventDescription', newEvent.EventDescription);
            formData.append('EventStart', newEvent.EventStart);
            formData.append('EventEnd', newEvent.EventEnd);
            formData.append('EventSlots', newEvent.EventSlots);
            formData.append('EventAgeneed', newEvent.EventAgeneed);
            formData.append('CategoryId', newEvent.CategoryId);
    
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/event/create', {
                method: 'POST',
                body: formData,
            });
            
            // Récupérer les données de la réponse
            const data = await response.json();
            // console.log(data);
            // Met à jour la liste des événements
            // setEvents([...events, data]);

            // Réinitialise les valeurs du formulaire
            setNewEvent({
                EventDescription: '',
                EventSlots: '',
                EventAgeneed: '',
                CategoryId: '',
                EventStart: '',
                EventEnd: ''
            });

            // Met à jour la liste des événements
            fetchEvents();

            setMessageAdd(data.status+ ", l'événement a bien été ajouté");
        } catch (error) {
            setMessageAdd('Erreur lors de l\'ajout de l\'événement')
        }
    };
    

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
            // console.log(cancelledEvent.IdEvent)
            // console.log(cancellationReason)
            // console.log(Array.from(formDataCancel.entries()))
            const response = await fetch(`http://localhost/Materclass-Unit/backend/api/event/cancel`, {
                method: 'POST',
                body: formDataCancel,
            });


            const data = await response.json();

            setEvents(events.map((event) => (event.IdEvent === data.IdEvent ? data : event)));

            setCancelledEvent(null);
            setCancellationReason('');
        } catch (error) {
            setErrorMessage('Erreur lors de l\'annulation de l\'événement');
        }
    };

    /* const handleAddCategory = async () => {
        try {
            const response = await fetch('http://localhost/Materclass-Unit/backend/api/category/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ CategoryName: categories }),
            });
            const data = await response.json();
            setCategory([...categories, data]);
            setCategory('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
        }
    } */

    return (
        <div>
            <div className="dashboard">
                <h2 data-testid="dashboardID"  className='dashboard-title'>Dashboard</h2>
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
                    {cancelledEvent && (
                        <div className='cancelledEvent'>
                            <h3>Annuler l'événement "{cancelledEvent.EventDescription}"</h3>
                            <textarea
                                data-testid="cancelTextArea"
                                placeholder="Raison de l'annulation"
                                value={cancellationReason}
                                onChange={(e) => setCancellationReason(e.target.value)}
                            />
                            {errorMessage && <p>{errorMessage}</p>}
                            <button data-testid="submit-cancel" onClick={handleCancelConfirm}>Confirmer</button>
                            <button onClick={() => setCancelledEvent(null)}>Retour</button>
                        </div>
                    )}
                    <h3 data-testid="events">Événements</h3>
                    <ul className="card-container">
                        {dataList.map((event) => (
                            <li key={event.IdEvent} className="card">
                                <p>{event.EventDescription}</p>
                                <p>Places disponibles : {event.EventSlots}</p>
                                <p>Âge requis : {event.EventAgeneed}</p>
                                <p>Catégorie : {event.EventCategoryId}</p>
                                <p>Début : {new Date(event.EventStart).toLocaleString()}</p>
                                <p>Fin : {new Date(event.EventEnd).toLocaleString()}</p>
                                <button onClick={() => handleCancelEvent(event)}>
                                    Annuler
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}