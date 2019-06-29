import React from 'react';
import './Weather.css';
const DARKSKY_API_KEY = "0494a26ed44fe957270c49feb96e1c34"


export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      datetime: '',
      lat: '',
      lng: '',
      address: '',
      description: '',
      current_temp: '',
      current_humidity: '',
      current_windspeed: '',
      current_precip: '',
      current_uv: '',
      current_visibility: '',
      forecast_temp: [],
      forecast_humidity: [],
      forecast_precip: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
    this.handleCurrentUV = this.handleUV.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  componentDidMount(){
    this.setState({lat: this.props.lat, lng: this.props.lng, address: this.props.address})
    this.getWeather();
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
        datetime: current.time,
        current_temp: current.temperature.toFixed(0),
        current_humidity: current.humidity,
        current_windspeed: current.windSpeed,
        current_precip: current.precipProbability,
        current_uv: current.uvIndex,
        current_visibility: current.visibility,
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
      return this.state.current_temp;
    }
  }

  handleAddress(){
    if(this.state.address !== ''){
      return this.capitalize(this.state.address.split(', ')[0]) + ', ' + this.state.address.split(', ').slice(-1)[0]
    }
    return ''
  }

  handleUV(){
    if(this.state.current_uv !== ''){
      return `UV Index ${this.state.current_uv}`
    }
    return ''
  }

  handleVisibility(){
    if(this.state.current_uv !== ''){
      return `Visibility ${this.state.current_visibility.toFixed(0)} km`
    }
    return ''
  }

  render(){
    return (
      <div>
        <div className="current-info">
          <h1 className="current-temp">{this.handleCurrentTemp()}<sup className="current-tempdeg">{`\u00b0`}</sup></h1>
          <h3 className="no-margin current-desc">{this.state.description}</h3>
          <p className="no-margin current-address">{this.handleAddress()}</p>
          <p className="current-uv">{this.handleUV()}</p>
          <p className="no-margin current-visibility">{this.handleVisibility()}</p>
        </div>
      </div>
      )
  }
}