import React from 'react';
import './Weather.css';
import LocationSearch from '../LocationSearch/LocationSearch.js';
const API_KEY = "4ed8b289a371e472ec463ab975967b31"


export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      country: '',
      current_temp: '',
      description: '',
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  handleLocationChange(city){
    this.setState({city: city});
  }

  async getWeather() {
    //CURRENT
    await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        country: json.sys.country,
        current_temp: json.main.temp,
        description: json.weather[0].description
      })
    })
    .catch(err => console.log(err));

    // FORECAST
    await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  }

  convertKelvinToCelcius(kelvin){
    return (kelvin - 273.15).toFixed(1)
  }

  capitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  handleCurrentTemp(){
    let temp = '';
    if(this.state.current_temp !== ''){
      temp = this.convertKelvinToCelcius(this.state.current_temp);
      return temp + ` \u00b0C`;
    }
  }

  handleDescription(){
    let desc_arr = this.state.description.split(' ');
    desc_arr = desc_arr.map(word => this.capitalize(word));
    return desc_arr.join(' ');
  }

  render(){
    return (
      <div>
        <LocationSearch loadWeather={this.getWeather} onLocationChange={this.handleLocationChange} />
        Weather Results
        <h1>{this.capitalize(this.state.city)}</h1>
        <h1>{this.handleCurrentTemp()}</h1>
        <h1>{this.handleDescription()}</h1>
      </div>
      )
  }
}