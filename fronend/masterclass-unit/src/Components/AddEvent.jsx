import React, { useState } from 'react';

function AddEventForm({ onEventAdded, dataCate }) {
    const [newEvent, setNewEvent] = useState({
        EventDescription: '',
        EventSlots: '',
        EventAgeneed: '',
        CategoryId: '',
        EventStart: '',
        EventEnd: ''
    });
    const [MessageAdd, setMessageAdd] = useState('');

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

            onEventAdded();
            // Réinitialise les valeurs du formulaire
            setNewEvent({
                EventDescription: '',
                EventSlots: '',
                EventAgeneed: '',
                CategoryId: '',
                EventStart: '',
                EventEnd: ''
            });
            
            setMessageAdd(data.status+ ", l'événement a bien été ajouté");
        } catch (error) {
            setMessageAdd('Erreur lors de l\'ajout de l\'événement')
        }
    };

    return (
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
            <button data-testid="submit-add"  onClick={handleAddEvent}>Ajouter</button>
            <p data-testid="error-Message-Add">{MessageAdd}</p>
        </div>
    );
}

export default AddEventForm;
