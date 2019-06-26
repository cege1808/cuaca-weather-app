import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather/Weather.js';

function App() {

  return (
    <div className="App">
      <header>
      </header>
      <div>
        <h1>CUACA</h1>
        <Weather />
      </div>
    </div>
  );
}

export default App;
