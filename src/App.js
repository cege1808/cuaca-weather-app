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
      <Row>
        <Cell desktopColumns={4} phoneColumns={0} tabletColumns={2}></Cell>
        <Cell desktopColumns={4} phoneColumns={4} tabletColumns={4} align="middle" className="main mdc-elevation--z10 mdc-elevation-transition">

          <TopAppBarFixedAdjust className="yellow weather-bar">
            <PhoneInterface />
            <TopAppBarRow>
              <TopAppBarSection align='start'>
                <TopAppBarIcon navIcon tabIndex={0}>
                  <MaterialIcon hasRipple icon='menu' className='rounded' onClick={() => console.log('click')}/>
                </TopAppBarIcon>
              </TopAppBarSection>
              <TopAppBarSection align='end' role='toolbar'>
                <TopAppBarIcon actionItem tabIndex={0}>
                  <MaterialIcon
                    aria-label="print page"
                    hasRipple
                    icon='print'
                    onClick={() => console.log('print')}
                  />
                </TopAppBarIcon>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBarFixedAdjust>

          <Weather />

        </Cell>
      </Row>
    </Grid>
  );
}

export default App;
