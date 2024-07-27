import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/api/notifications')
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notification data:', error));
  }, []);

  return (
    <div className="notification">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.notification_id}>
            <p>{notification.message}</p>
            <p><strong>Method:</strong> {notification.method}</p>
            <p><strong>Recipient:</strong> {notification.recipient}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
