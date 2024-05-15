import React, { useState, useEffect } from 'react';
import "./EventList.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [ticketModal, setTicketModal] = useState(false);
    const [numAttendees, setNumAttendees] = useState(1);
    const [confirmAge, setConfirmAge] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        const submissionData = {
            eventId: selectedEvent.IdEvent,
            numAttendees: numAttendees,
            allOfAge: confirmAge,
            dateTime: new Date().toISOString()
        };
        console.log(submissionData);
        // Reset form and close modal
        setNumAttendees(1);
        setConfirmAge(false);
        toggleTicketModal(null);
    }

    useEffect(() => {
        fetch('http://localhost/Materclass-Unit/backend/api/event/list')
            .then(response => response.json())
            .then(data => setEvents(data.Events))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <>
            <Header />
            <div className="event-list">
                <h2 data-testid="event-page-title">Upcoming Events</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.IdEvent} className='event-card'>
                            <h3 data-testid="event-desc">{event.EventDescription}</h3>
                            <p data-testid="event-start-date">Start Date : {event.EventStart}</p>
                            <p data-testid="event-end-date">End Date : {event.EventEnd}</p>
                            <p data-testid="event-slots">Slots : {event.EventSlots}</p>
                            <p data-testid="event-min-age">Age Requirement : {event.EventAgeneed > 0 ? event.EventAgeneed : "All ages Welcome"}</p>
                            <p data-testid="event-cat">Category ID : {event.category}</p>
                            <button data-testid="event-ticket-button" onClick={() => toggleTicketModal(event)}>Buy Tickets</button>
                        </li>
                    ))}
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
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default EventList;
