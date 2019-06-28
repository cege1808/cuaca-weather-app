import React from 'react';
import './Weather.css';
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
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
  }

  componentDidMount(){
    this.setState({lat: this.props.lat, lng: this.props.lng, address: this.props.address})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.address !== prevProps.address){
      this.setState({lat: this.props.lat, lng: this.props.lng, address: this.props.address})
      this.getWeather();
    }
  }

  async getWeather() {
    let cors_uri = `https://cors-anywhere.herokuapp.com/`;
    let uri = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${this.props.lat},${this.props.lng}?exclude=[minutely,flags]&units=si`;
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

  handleAddress(){
    if(this.state.address !== ''){
      return this.capitalize(this.state.address.split(', ')[0]) + ', ' + this.state.address.split(', ').slice(-1)[0]
    }
    return ''
  }

  render(){
    return (
      <div>
        <h1>{this.handleAddress()}</h1>
        <h1>{this.handleCurrentTemp()}</h1>
        <h1>{this.state.description}</h1>
      </div>
      )
  }
}