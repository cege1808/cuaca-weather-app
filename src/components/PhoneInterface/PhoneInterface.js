import React from 'react';
import { TopAppBarIcon,  TopAppBarRow, TopAppBarSection } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import './PhoneInterface.scss';

export default class PhoneInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {mode: 'regular'}
  }

  render(){
    return (
      <TopAppBarRow>
        <TopAppBarSection align='start' className="skinny-padding">
          <TopAppBarIcon>
            <strong className="phone-icon time">9:14</strong>
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
}