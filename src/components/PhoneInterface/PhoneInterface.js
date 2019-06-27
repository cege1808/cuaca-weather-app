import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import { TopAppBarFixedAdjust, TopAppBarIcon,  TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import './PhoneInterface.scss';

export default class PhoneInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {mode: 'regular'}
  }

  renderPhoneBar(){
    return (
      <TopAppBarRow>
        <TopAppBarSection align='start' className="skinny-padding">
          <TopAppBarIcon>
            <strong className="phone-icon time">9:14</strong>
          </TopAppBarIcon>
        </TopAppBarSection>
        <TopAppBarSection align='end' className="skinny-padding">
          <TopAppBarIcon>
            <MaterialIcon icon='signal_cellular_alt' className="phone-icon" />
          </TopAppBarIcon>
          <TopAppBarIcon>
            <MaterialIcon icon='wifi' className="phone-icon" />
          </TopAppBarIcon>
          <TopAppBarIcon>
            <MaterialIcon icon='battery_full' className="battery-rotate phone-icon" />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    )
  }

  renderAppBar(){
    return (
      <TopAppBarRow>
        <TopAppBarSection align='start' className="skinny-padding">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' className='rounded' onClick={() => console.log('click')}/>
          </TopAppBarIcon>
        </TopAppBarSection>
        <TopAppBarSection className="skinny-padding">
          <TopAppBarTitle className="weather-title">
            <p>Weather</p>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar' className="skinny-padding">
          <TopAppBarIcon actionItem tabIndex={1}>
            <MaterialIcon
              aria-label="add location"
              hasRipple
              icon='search'
              onClick={() => console.log('location')}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    )
  }

  render(){
    return (
      <Row>
        <Cell desktopColumns={4} phoneColumns={0} tabletColumns={2}></Cell>
        <Cell desktopColumns={4} phoneColumns={4} tabletColumns={4} align="middle" className="main mdc-elevation--z10 mdc-elevation-transition">
          <TopAppBarFixedAdjust className="yellow weather-bar">
            {this.renderPhoneBar()}
            {this.renderAppBar()}
            {this.props.children}
          </TopAppBarFixedAdjust>
        </Cell>
      </Row>
      )
  }
}