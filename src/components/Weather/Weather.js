import React from 'react';
import './Weather.css';
import LocationSearch from '../LocationSearch/LocationSearch.js';
const API_KEY = "4ed8b289a371e472ec463ab975967b31"


export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {city: '', current_temp: ''};
    this.getWeather = this.getWeather.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(city){
    this.setState({city: city});
  }

  async getWeather() {
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    // const response = await api_call.json();
    // console.log(response);
    const forecast_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    // const response = await api_call.json();
    // console.log(response);
  }


  render(){
    return (
      <div>
        <LocationSearch loadWeather={this.getWeather} onLocationChange={this.handleLocationChange} />
        Weather Results
        <h1>{this.state.city.toUpperCase()}</h1>
        <h1>{this.state.current_temp}</h1>
      </div>
      )
  }
}