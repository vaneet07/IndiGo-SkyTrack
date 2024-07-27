import React from 'react';
import FlightStatus from './components/FlightStatus';
import Notification from './components/Notification';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight Status and Notifications</h1>
      </header>
      <FlightStatus />
      <Notification />
    </div>
  );
}

export default App;
