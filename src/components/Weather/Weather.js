import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import { Chart } from "react-google-charts";
import './Weather.css';
const DARKSKY_API_KEY = process.env.REACT_APP_DARKSKY_APIKEY;
const ICON_PATH = "/icons/amcharts_weather_icons_1.0.0/";

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
      current_graph_temp: [],
      current_graph_precip: [],
      current_graph_wind: [],
      dforecast_datetime: [], //daily forecast
      dforecast_temp: [],
      dforecast_precip: [],
      dforecast_wind: [],
      dforecast_icon: [],
      hforecast_temp: [], //hourly forecast, formated for Chart
      hforecast_precip: [],
      hforecast_wind: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleActiveIndexUpdate = this.handleActiveIndexUpdate.bind(this);
    this.handleCurrentTemp = this.handleCurrentTemp.bind(this);
    this.handleCurrentUV = this.handleUV.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.renderDForecastTemp = this.renderDForecastTemp.bind(this);
    this.renderDForecastPrecip = this.renderDForecastPrecip.bind(this);
    this.renderDForecastWind = this.renderDForecastWind.bind(this);
    this.renderDForecast = this.renderDForecast.bind(this);
    this.renderHForecast = this.renderHForecast.bind(this);
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
      // console.log(json)
      let current = json.currently
      let dforecast = json.daily.data
      let hforecast = json.hourly.data
      let dtemp_arr = [];
      let dprecip_arr = [];
      let dwind_arr = [];
      let dtime_arr = [];
      let dicon_arr = [];
      let htemp_arr = [['Time', 'Temperature', { role: "annotation", type: "string" }]];
      let hprecip_arr = [['Time', 'Precipitation', { role: "annotation", type: "string" }]];
      let hwind_arr = [['Time', 'Wind', { role: "annotation", type: "string" }]];

      for(let i=0; i<4; i++){
        // Data array starts today. We need the next 4 days
        let data = dforecast[i+1];
        dtime_arr[i] = data.time*1000; //Time given in miliseconds and we need seconds
        dtemp_arr[i] = [data.temperatureLow, data.temperatureHigh] //Celcius
        dprecip_arr[i] = data.precipProbability*100; //Decimal to Percentage
        dwind_arr[i] = data.windSpeed*3600/1000; //m/s to km/h
        dicon_arr[i] = data.icon;
      }

      for (let j=0; j<12; j++){ // Chart the next 12 hours
        let data = hforecast[j];
        let time = new Date(data.time*1000);
        let temp_data = data.temperature;
        let precip_data = (data.precipProbability*100);
        let wind_data = (data.windSpeed*3600/1000);
        htemp_arr.push([time, temp_data, j%2===0 ? undefined : temp_data.toFixed(1)])
        hprecip_arr.push([time, precip_data, j%2===0 ? undefined : precip_data.toFixed(0)])
        hwind_arr.push([time, wind_data, j%2===0 ? undefined : wind_data.toFixed(1)])
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
        dforecast_datetime: dtime_arr,
        dforecast_temp: dtemp_arr,
        dforecast_precip: dprecip_arr,
        dforecast_wind: dwind_arr,
        dforecast_icon: dicon_arr,
        hforecast_temp: htemp_arr,
        hforecast_precip: hprecip_arr,
        hforecast_wind: hwind_arr,
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

  getIcon(icon_desc){
    if(icon_desc.includes('cloudy')){
      return 'cloudy.svg';
    } else if (icon_desc.includes('rain')){
      return 'rainy-7.svg';
    } else if (icon_desc.includes('clear')){
      return 'day.svg';
    } else if (icon_desc.includes('snow')){
      return 'snowy-6.svg';
    } else if (icon_desc.includes('thunder')){
      return 'thunder.svg';
    }
  }

  renderIcon(index){
    return (
      <i><img src={`${ICON_PATH}/animated/${this.getIcon(this.state.dforecast_icon[index])}`} alt='weather-icon' /></i>
    )
  }

  renderDForecastTemp(){
    let temps = [];
    for(const [index, value] of this.state.dforecast_temp.entries()){
      temps.push(
        <Cell columns={3} key={'ftemp-' + index} className="dcell">
          <p><strong>{this.getDay(this.state.dforecast_datetime[index])}</strong></p>
          {this.renderIcon(index)}
          <p>{value[0].toFixed(0)}-{value[1].toFixed(0)}&deg;C</p>
        </Cell>
      )
    }
    return <Row>{temps}</Row>
  }

  renderDForecastPrecip(){
    let precips = [];
    for(const [index, value] of this.state.dforecast_precip.entries()){
      precips.push(
        <Cell columns={3} key={'fprecip-' + index} className="dcell">
          <p><strong>{this.getDay(this.state.dforecast_datetime[index])}</strong></p>
          {this.renderIcon(index)}
          <p>{(value).toFixed(0)}%</p>
        </Cell>
      )
    }
    return <Row>{precips}</Row>
  }

  renderDForecastWind(){
    let winds = [];
    for(const [index, value] of this.state.dforecast_wind.entries()){
      winds.push(
        <Cell columns={3} key={'fwind-' + index} className="dcell">
          <p><strong>{this.getDay(this.state.dforecast_datetime[index])}</strong></p>
          {this.renderIcon(index)}
          <p>{(value).toFixed(0)}km/h</p>
        </Cell>
      )
    }
    return <Row>{winds}</Row>
  }

  renderDForecast(){
    switch(this.state.activeIndex){
      case 0: return this.renderDForecastTemp();
      case 1: return this.renderDForecastPrecip();
      case 2: return this.renderDForecastWind();
      default: return;
    }
  }

  renderHForecast(){
    let hforecast;
    switch(this.state.activeIndex){
      case 0: hforecast = this.state.hforecast_temp; break;
      case 1: hforecast = this.state.hforecast_precip; break;
      case 2: hforecast = this.state.hforecast_wind; break;
      default: break;
    }
    return (
       <Chart
        width={'100%'} height={'150px'} chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={hforecast}
        options={
          {
            hAxis:{
              gridlines: {count: 6, color: 'white'},
              textStyle: {color: 'lightgrey', bold: true},
              format: 'hh a',
              baselineColor: 'white',
            },
            vAxis:{
              gridlines:{count: 0},
              textStyle: {color: 'white'}
            },
            annotations: {
              style: 'point',
              domain: {style: {color: 'lightgrey', length: 50}},
              textStyle: {color: 'black', fontSize: 12},
              alwaysOutside: true,
            },
            lineWidth: 4,
            colors: ['#56A0EE','#8C77FF'],
            fontName: 'Product Sans',
            legend: 'none',
            curveType: 'function',
            animation: {
              startup: true,
              easing: 'linear',
              duration: 800,
            },
          }
        }
      />
    );
  }

  render(){
    return (
      <div className="content">
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
            <Tab><span className='mdc-tab__text-label'>&nbsp;&nbsp;Wind&nbsp;&nbsp;&nbsp;</span></Tab>
          </TabBar>
        </div>
        <div className="current-detail">
          <p>Precipitation {(this.state.current_precip*100).toFixed(0)}%</p>
          <span>&#09;&middot;&#09;</span>
          <p>Humidity {(this.state.current_humidity*100).toFixed(0)}%</p>
          <span>&#09;&middot;&#09;</span>
          <p>Wind {(this.state.current_windspeed*3600/1000).toFixed(0)}km/h</p>
        </div>
        <div className="forecast-hourly">
          {this.renderHForecast()}
        </div>
        <div className="forecast-daily">
          {this.renderDForecast()}
        </div>
      </div>
      )
  }
}