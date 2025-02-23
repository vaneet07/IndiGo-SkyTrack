import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightStatus.css';

// function FlightStatus() {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/flights')
//       .then(response => setFlights(response.data))
//       .catch(error => console.error('Error fetching flight data:', error));
//   }, []);

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
  }, []);
  
  return (
    <div className="flight-status">
      <h2>Flight Status</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight.flight_id}>
            <p><strong>{flight.flight_id}</strong> ({flight.airline}) - {flight.status}</p>
            <p>Departure: {flight.departure_gate}, Arrival: {flight.arrival_gate}</p>
            <p>Scheduled Departure: {flight.scheduled_departure}</p>
            <p>Scheduled Arrival: {flight.scheduled_arrival}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightStatus;
