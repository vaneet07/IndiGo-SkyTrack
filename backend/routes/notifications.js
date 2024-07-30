const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const admin = require('../config/firebaseConfig');
const transporter = require('../config/emailConfig');
const twilioClient = require('../config/twilioConfig');

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get notification by ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new notification
router.post('/send', async (req, res) => {
  const { flight_id, message, method, recipient } = req.body;

  if (!flight_id || !message || !method || !recipient) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const notification = new Notification({
    flight_id,
    message,
    method,
    recipient,
    timestamp: new Date()
  });

  try {
    const newNotification = await notification.save();
    sendNotification(newNotification); // Send notification
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update notification
router.patch('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    Object.assign(notification, req.body);
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    await notification.remove();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Function to send notification
const sendNotification = (notification) => {
  const message = notification.message;
  const recipient = notification.recipient;
  const method = notification.method;

  if (method === 'Email') {
    sendEmail(recipient, message);
  } else if (method === 'SMS') {
    sendSMS(recipient, message);
  } else if (method === 'App') {
    sendAppNotification(recipient, message);
  }

  

};

// Function to send email notification
const sendEmail = (recipient, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: 'Flight Notification',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function to send SMS notification
const sendSMS = (recipient, message) => {
  twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: recipient
  }).then(message => console.log('SMS sent:', message.sid))
    .catch(error => console.error('Error sending SMS:', error));
};

// Function to send app notification via FCM
const sendAppNotification = (recipient, message) => {
  const payload = {
    notification: {
      title: 'Flight Status Update',
      body: message
    }
  };

  admin.messaging().sendToDevice(recipient, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
};

module.exports = router;
