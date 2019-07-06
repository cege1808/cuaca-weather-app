import React from 'react';
import './App.css';
import {Grid} from '@material/react-layout-grid';
import PhoneInterface from './components/PhoneInterface/PhoneInterface.js';

function App() {
  return (
    <Grid className="App">
      <PhoneInterface>
      </PhoneInterface>
    </Grid>
  );
}

export default App;
