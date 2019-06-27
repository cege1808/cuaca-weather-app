import React from 'react';
import './Weather.css';
import LocationSearch from '../LocationSearch/LocationSearch.js';
const DARKSKY_API_KEY = "0494a26ed44fe957270c49feb96e1c34"


export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lat: '',
      lng: '',
      address: '',
      description: '',
      current_temp: '',
      current_humidity: '',
      current_windspeed: '',
      current_precip: '',
      forecast_temp: [],
      forecast_humidity: [],
      forecast_precip: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
  }

  handleLocationChange(lat, lng, address){
    this.setState({lat: lat, lng: lng, address: address});
    this.getWeather();
  }

  async getWeather() {
    let cors_uri = `https://cors-anywhere.herokuapp.com/`;
    let uri = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${this.state.lat},${this.state.lng}?exclude=[minutely,flags]&units=si`;
    await fetch(cors_uri + uri, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      let current = json.currently
      this.setState({
        // country: json.sys.country,
        current_temp: current.temperature,
        current_humidity: current.humidity,
        current_windspeed: current.windSpeed,
        current_precip: current.precipProbability,
        description: current.summary
      })
    })
    .catch(err => console.log(err));
  }

  convertKelvinToCelcius(kelvin){
    return (kelvin - 273.15).toFixed(1)
  }

  capitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  capitalizePhrase(phrase){
    let phr_arr = phrase.split(' ');
    phr_arr = phr_arr.map(word => this.capitalize(word));
    return phr_arr.join(' ');
  }

  handleCurrentTemp(){
    if(this.state.current_temp !== ''){
      return this.state.current_temp + ` \u00b0C`;
    }
  }


  render(){
    return (
      <div className="purple-gradient">
        <LocationSearch loadWeather={this.getWeather} onLocationChange={this.handleLocationChange} />
        Weather Results
        <h1>{this.capitalize(this.state.address.split(', ')[0])}</h1>
        <h1>{this.handleCurrentTemp()}</h1>
        <h1>{this.state.description}</h1>
      </div>
      )
  }
}