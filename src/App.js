import React from 'react';
import logo from './logo.png';
import './App.css';
import Weather from './components/Weather/Weather.js';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import {Fab} from '@material/react-fab'
import PhoneInterface from './components/PhoneInterface/PhoneInterface.js';

function App() {
  // const logo = <Fab className="weather-fab" icon={<img src={logo} alt="logo" className="weather-fab-logo" />} />;
  return (
    <Grid className="App">

      <Row>
        <Cell align="middle" columns={12}>
        <h1>CUACA</h1></Cell>
      </Row>
      <PhoneInterface>
        Hello world
        <Weather />
      </PhoneInterface>
    </Grid>
  );
}

export default App;
