const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_id: { type: String, required: true },
  flight_id: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
  method: { type: String, required: true },
  recipient: { type: String, required: true }
});

module.exports = mongoose.model('Notification', notificationSchema);
