import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import './Weather.css';
const DARKSKY_API_KEY = "0494a26ed44fe957270c49feb96e1c34"

export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
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
      forecast_precip: [],
      forecast_wind: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleActiveIndexUpdate = this.handleActiveIndexUpdate.bind(this);
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
    this.handleCurrentUV = this.handleUV.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.renderForecastTemp = this.renderForecastTemp.bind(this);
    this.renderForecastPrecip = this.renderForecastPrecip.bind(this);
    this.renderForecastWind = this.renderForecastWind.bind(this);
    this.renderForecast = this.renderForecast.bind(this);
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

  handleActiveIndexUpdate(activeIndex) {this.setState({activeIndex: activeIndex})};


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
      let forecast = json.daily.data
      let temp_arr = [];
      let precip_arr = [];
      let wind_arr = [];
      let time_arr = [];
      for(let i=0; i<4; i++){
        // Data array starts today. We need the next 4 days
        temp_arr[i] = [forecast[i+1].temperatureLow, forecast[i+1].temperatureHigh]
        precip_arr[i] = forecast[i+1].precipProbability;
        wind_arr[i] = forecast[i+1].windSpeed;
        time_arr[i] = forecast[i+1].time*1000; //Time given in miliseconds and we need seconds
      }
      this.setState({
        datetime: current.time,
        current_temp: current.temperature.toFixed(0),
        current_humidity: current.humidity,
        current_windspeed: current.windSpeed,
        current_precip: current.precipProbability,
        current_uv: current.uvIndex,
        current_visibility: current.visibility,
        description: current.summary,
        forecast_datetime: time_arr,
        forecast_temp: temp_arr,
        forecast_precip: precip_arr,
        forecast_wind: wind_arr,
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

  getDay(time){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let index = new Date(time).getDay()
    return days[index];
  }

  renderForecastTemp(){
    let temps = [];
    for(const [index, value] of this.state.forecast_temp.entries()){
      temps.push(
        <Cell columns={3} key={'ftemp-' + index}>
          <p><strong>{this.getDay(this.state.forecast_datetime[index])}</strong></p>
          <p>{value[0].toFixed(0)} - {value[1].toFixed(0)}</p>
        </Cell>
      )
    }
    return <Row>{temps}</Row>
  }

  renderForecastPrecip(){
    let precips = [];
    for(const [index, value] of this.state.forecast_precip.entries()){
      precips.push(
        <Cell columns={3} key={'fprecip-' + index}>
          <p><strong>{this.getDay(this.state.forecast_datetime[index])}</strong></p>
          <p>{(value*100).toFixed(0)}%</p>
        </Cell>
      )
    }
    return <Row>{precips}</Row>
  }

  renderForecastWind(){
    let winds = [];
    for(const [index, value] of this.state.forecast_wind.entries()){
      winds.push(
        <Cell columns={3} key={'fwind-' + index}>
          <p><strong>{this.getDay(this.state.forecast_datetime[index])}</strong></p>
          <p>{(value*3600/1000).toFixed(0)}km/h</p>
        </Cell>
      )
    }
    return <Row>{winds}</Row>
  }

  renderForecast(){
    if(this.state.activeIndex === 0){
      return this.renderForecastTemp();
    } else if(this.state.activeIndex === 1){
      return this.renderForecastPrecip();
    } else {
      return this.renderForecastWind();
    }
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
        <div className="tab-bar">
          <TabBar activeIndex={this.state.activeIndex} handleActiveIndexUpdate={this.handleActiveIndexUpdate}>
            <Tab><span className='mdc-tab__text-label'>Temperature</span></Tab>
            <Tab><span className='mdc-tab__text-label'>Precipitation</span></Tab>
            <Tab><span className='mdc-tab__text-label'>Wind</span></Tab>
          </TabBar>
        </div>
        <div className="current-detail">
          <p>Precipitation {(this.state.current_precip*100).toFixed(0)}%</p>
          <span>&#09;&middot;&#09;</span>
          <p>Humidity {(this.state.current_humidity*100).toFixed(0)}%</p>
          <span>&#09;&middot;&#09;</span>
          <p>Wind {(this.state.current_windspeed*3600/1000).toFixed(0)}km/h</p>
        </div>
        <div className="forecast">
          {this.renderForecast()}
        </div>
      </div>
      )
  }
}