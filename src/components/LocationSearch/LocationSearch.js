import React from 'react';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
import List, {ListItem, ListItemText} from '@material/react-list';
import TextField, {Input} from '@material/react-text-field';
import './LocationSearch.css';

export default class LocationSearch extends React.Component {

  constructor(props){
    super(props);
    this.state = {address: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(address){
    this.setState({address: address});
  }

  // When the user selects an autocomplete suggestion...
  handleSelect(address){
    geocodeByAddress(address)
      .then(function(results){
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        let address = results[0].formatted_address;
        this.props.onLocationChange(lat, lng, address);
      }.bind(this))
      .catch(error => console.error('Error', error))

  }

  render(){
    const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
      <div className="autocomplete-root">
        <TextField label="Search Location" outlined="true" fullWidth="true">
          <Input className="form-control" {...getInputProps()} />
        </TextField>
        <List className="autocomplete-dropdown-container">
          {suggestions.map(suggestion => (
            <ListItem {...getSuggestionItemProps(suggestion)} className={suggestion.active
                  ? 'suggestion-item active' : 'suggestion-item'}>
              <ListItemText primaryText={suggestion.description} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    const searchOptions = {types: ['(cities)']}
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {renderInput}
      </PlacesAutocomplete>
      )
  }
}