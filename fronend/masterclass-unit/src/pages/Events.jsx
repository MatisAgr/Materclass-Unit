import React, { useState, useEffect } from 'react';
import "./EventList.css"

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [ticketModal, setTicketModal] = useState(false);
    const [numAttendees, setNumAttendees] = useState(1);
    const [confirmAge, setConfirmAge] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cancellations, setCancellations] = useState([]);
    const userId = localStorage.getItem('userId');

    const toggleTicketModal = (event) => {
        setSelectedEvent(event);
        setTicketModal(!ticketModal);
    }

    const handleNumAttendeesChange = (e) => {
        setNumAttendees(parseInt(e.target.value));
        if (confirmAge && parseInt(e.target.value) <= 1) {
            setConfirmAge(false);
        }
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedEvent) return; 
      const formData = new FormData();
      formData.append('idEvent', selectedEvent.IdEvent);
      formData.append('idUser', localStorage.getItem('userId')); 

      const updatedSlots = selectedEvent.EventSlots - numAttendees;
      const formData1 = new FormData();
      console.log(selectedEvent)

      formData1.append('IdEvent', selectedEvent.IdEvent);
      formData1.append('EventDescription', selectedEvent.EventDescription);
      formData1.append('EventStart', selectedEvent.EventStart);
      formData1.append('EventEnd', selectedEvent.EventEnd);
      formData1.append('EventSlots', updatedSlots);
      formData1.append('EventAgeneed', selectedEvent.EventAgeneed);
      formData1.append('CategoryId', selectedEvent.EventCategoryId);
      console.log(formData1)

      fetch('http://localhost/Materclass-Unit/backend/api/invoice/create', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
        console.log('Invoice created:', data);
       
        fetch(`http://localhost/Materclass-Unit/backend/api/event/update`, {
            method: 'POST',
            body: formData1
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                console.log('Event updated successfully:', data.message);
                // Reset form and close modal
                setNumAttendees(1);
                setConfirmAge(false);
                toggleTicketModal(null);
            } else {
                console.error('Error updating event:', data.message);
                // Handle error here, maybe display an error message to the user
            }
        })
        .catch(error => {
            console.error('Error updating event:', error);
            // Handle error here, maybe display an error message to the user
        });
    })
    .catch(error => {
        console.error('Error creating invoice:', error);
        // Handle error here, maybe display an error message to the user
    });
}

  useEffect(() => {
    Promise.all([
        fetch('http://localhost/Materclass-Unit/backend/api/event/list').then(response => response.json()),
        fetch('http://localhost/Materclass-Unit/backend/api/category/list').then(response => response.json()),
        fetch('http://localhost/Materclass-Unit/backend/api/event/createCancel').then(response => response.json())
    ])
    .then(([eventData, categoryData, cancelationData]) => {
        setEvents(eventData.Events);
        setCategories(categoryData.Categories);
        setCancellations(cancelationData.Cancelations);
    })
    .catch(error => console.error('Error fetching events and categories:', error));
}, []);

    // console.log(cancellations)
    
    return (
        <>
            <div className="event-list">
                <h2 data-testid="event-page-title">Upcoming Events</h2>
                <ul>
                    {events.map(event => {
                        // Find the category object corresponding to the event's category ID
                        const category = categories.find(cat => cat.idCategory === event.EventCategoryId);
                        const cancellation = cancellations.find(cancel => cancel.cancel_event_id === event.IdEvent); // Check if event is canceled

                        return (
                            <li key={event.IdEvent} className='event-cards'>
                                <h3 data-testid="event-desc">{event.EventDescription}</h3>
                                <p data-testid="event-start-date">Début : {event.EventStart}</p>
                                <p data-testid="event-end-date">Fin : {event.EventEnd}</p>
                                <p data-testid="event-slots">Places disponibles : {event.EventSlots}</p>
                                <p data-testid="event-min-age">Âge requis : {event.EventAgeneed > 0 ? event.EventAgeneed : "All ages Welcome"}</p>
                                {/* Display the category name if category is found */}
                                {category && <p data-testid="event-cat">Catégorie : {category.CategoryName}</p>}
                                {cancellation ? (
                                    <p data-testid="event-canceled">Evenement Annulée : {cancellation.cancel_reason}</p>
                                ) : (
                                    <>
                                        {event.EventSlots !== 0 && userId && (
                                            <button data-testid="event-ticket-button" onClick={() => toggleTicketModal(event)}>Buy Tickets</button>
                                        )}
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {ticketModal && (
                <div className='ticket-modal'>
                    <div onClick={() => toggleTicketModal(null)} className="overlay"></div>
                    <div className='modal-content'>
                        <h2>Buy Tickets</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Number of Attendees:</label>
                            <input type="number" value={numAttendees} onChange={handleNumAttendeesChange} min="1" />
                            {selectedEvent && selectedEvent.EventAgeneed > 0 && numAttendees > 1 &&
                                <div>
                                    <input type="checkbox" checked={confirmAge} onChange={() => setConfirmAge(!confirmAge)} />
                                    <label>Confirm all attendees are above the minimum age</label>
                                </div>
                            }
                            <button type="submit" disabled={selectedEvent && selectedEvent.EventAgeneed > 0 && numAttendees > 1 && !confirmAge}>Buy</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventList;
