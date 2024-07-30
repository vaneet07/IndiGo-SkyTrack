import React, { useState } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [flightId, setFlightId] = useState('');
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('Email');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = {
      flight_id: flightId,
      message: message,
      method: method,
      recipient: recipient
    };

    try {
      await axios.post('http://localhost:5000/api/notifications', notification);
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Flight ID:</label>
        <input type="text" value={flightId} onChange={(e) => setFlightId(e.target.value)} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Method:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          <option value="App">App</option>
        </select>
      </div>
      <div>
        <label>Recipient:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
      </div>
      <button type="submit">Send Notification</button>
    </form>
  );
};

export default NotificationForm;
