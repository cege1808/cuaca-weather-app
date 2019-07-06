import React from 'react';
import logo from './logo.png';
import './App.css';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import PhoneInterface from './components/PhoneInterface/PhoneInterface.js';

function App() {
  return (
    <Grid className="App">
      <Row>
        <Cell align="middle" columns={12}>
        <h1>CUACA</h1></Cell>
      </Row>
      <PhoneInterface>
      </PhoneInterface>
    </Grid>
  );
}

export default App;
