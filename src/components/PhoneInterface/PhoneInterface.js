import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import { TopAppBarFixedAdjust, TopAppBarIcon,  TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import './PhoneInterface.scss';
import LocationSearch from '../LocationSearch/LocationSearch.js';
import Weather from '../Weather/Weather.js';

export default class PhoneInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSearching: false,
      lat: 49.239623,
      lng: -123.110912,
      address: 'Vancouver, Canada'
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(lat, lng, address){
    this.setState({lat: lat, lng: lng, address: address, isSearching: false});
  }

  renderPhoneBar(){
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    if(hour.toString().length === 1){ hour = '0' + hour }
    if(minute.toString().length === 1){ minute = '0' + minute }
    return (
      <TopAppBarRow>
        <TopAppBarSection align='start' className="skinny-padding">
          <TopAppBarIcon>
            <strong className="phone-icon time">{hour}:{minute}</strong>
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

  toggleSearch(){
    this.setState({isSearching: !this.state.isSearching});
    console.log('showsearch: ' + this.state.isSearching);
  }

  renderAppBar(){
    return (
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon className="non-pointer">
            <MaterialIcon icon='cloud_queue' />
          </TopAppBarIcon>
        </TopAppBarSection>
        <TopAppBarSection>
          <TopAppBarTitle className="weather-title">
            <p>Weather</p>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <TopAppBarIcon actionItem>
            <MaterialIcon
              aria-label="add location"
              hasRipple
              icon='search'
              onClick={this.toggleSearch}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    )
  }

  renderSearchBar(){
    return (
      <div>
      <div className="search-width search-bar-item">
      <LocationSearch  onLocationChange={this.handleLocationChange} />
      </div>
      <TopAppBarSection align='end' role='toolbar' className="search-bar-item search-close-icon">
          <TopAppBarIcon actionItem>
            <MaterialIcon
              aria-label="close search"
              hasRipple
              icon='close'
              onClick={this.toggleSearch}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </div>
    )
  }

  renderBar(){
    if(this.state.isSearching) return this.renderSearchBar()
    else return this.renderAppBar()
  }


  render(){
    return (
      <Row>
        <Cell desktopColumns={4} phoneColumns={0} tabletColumns={2}></Cell>
        <Cell desktopColumns={4} phoneColumns={4} tabletColumns={4} align="middle" className="main mdc-elevation--z10 mdc-elevation-transition">
          <TopAppBarFixedAdjust className="yellow weather-bar" dense="true">
            {this.renderPhoneBar()}
            {this.renderBar()}
          </TopAppBarFixedAdjust>
          {this.props.children}
          <Weather lat={this.state.lat} lng={this.state.lng} address={this.state.address} />
        </Cell>
      </Row>
      )
  }
}