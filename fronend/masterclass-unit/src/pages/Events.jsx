import React, { useState, useEffect } from 'react';
import "./EventList.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      fetch('event.json')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    }, []);
      
   
  return (
    <>
    <Header/>
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} className='event-card'>
            <h3>{event.name}</h3>
            <p>Description : {event.desc}</p>
            <p>Start Date : {event.start}</p>
            <p>End Date : {event.end}</p>
            <p>Slots : {event.slots}</p>
            <p>Age Requirement : {event.ageneed}</p>
            <p>Category ID : {event.category}</p>
            <button>Buy Tickets</button>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default EventList;

