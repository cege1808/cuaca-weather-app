import React from 'react';
import './LocationSearch.css';
const API_KEY = "4ed8b289a371e472ec463ab975967b31"

export default class LocationSearch extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    this.props.onLocationChange(event.target.value);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('submitted')
    this.props.loadWeather(this.state.value);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="location" placeholder="Location" value={this.state.value} onChange={this.handleChange} />
        <button>Get Weather</button>
      </form>
      )
  }
}