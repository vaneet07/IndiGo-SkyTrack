import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFlights = () => {
  return axios.get(`http://localhost:5000/api/flights`);
};

export const getNotifications = () => {
  return axios.get(`http://localhost:5000/api/notifications`);
};
