require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flightRoutes = require('./routes/flights');
const notificationRoutes = require('./routes/notifications');
const Flight = require('./models/Flight');
const Notification = require('./models/Notification');

const app = express();
const port = 5000;

const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());


// // Middleware
// app.use(bodyParser.json());

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/notifications', notificationRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/flightStatus', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    populateData(); // Call populateData after the connection is established
  })
  .catch(err => console.log(err));

// Sample flight data
const flights = [
  {
    flight_id: "6E 2341",
    airline: "Indigo",
    status: "On Time",
    departure_gate: "A12",
    arrival_gate: "B7",
    scheduled_departure: new Date("2024-07-26T14:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T18:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2342",
    airline: "Indigo",
    status: "Delayed",
    departure_gate: "C3",
    arrival_gate: "D4",
    scheduled_departure: new Date("2024-07-26T16:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T20:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2343",
    airline: "Indigo",
    status: "Cancelled",
    departure_gate: "E2",
    arrival_gate: "F1",
    scheduled_departure: new Date("2024-07-26T12:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T16:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  }
];

// Sample notification data
const notifications = [
  {
    notification_id: "1",
    flight_id: "6E 2341",
    message: "Your flight 6E 2341 is on time. Departure gate: A12.",
    timestamp: new Date("2024-07-26T13:00:00Z"),
    method: "SMS",
    recipient: "+12345678905"
  },
  {
    notification_id: "2",
    flight_id: "6E 2342",
    message: "Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3.",
    timestamp: new Date("2024-07-26T15:30:00Z"),
    method: "Email",
    recipient: "gargvaneet7@google.com"
  },
  {
    notification_id: "3",
    flight_id: "6E 2343",
    message: "Your flight 6E 2343 has been cancelled.",
    timestamp: new Date("2024-07-26T11:00:00Z"),
    method: "App",
    recipient: "user_app_id_12345"
  }
];

// Populate data function
const populateData = async () => {
  try {
    await Flight.deleteMany({});
    await Notification.deleteMany({});
    await Flight.insertMany(flights);
    await Notification.insertMany(notifications);
    console.log('Data populated...');
  } catch (err) {
    console.error(err);
  }
};

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
