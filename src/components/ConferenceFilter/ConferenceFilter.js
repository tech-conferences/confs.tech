import React, { Component } from 'react';
import {Select, Card} from '@shopify/polaris';
import './ConferenceFilter.css';

export default class ConferenceFilter extends Component {
  render() {
    const {date, handleDateChange, handleTypeChange} = this.props;

    return (
      <Card sectioned>
        <div className="ConferenceFilter">
          <Select
            label="Date"
            options={['2017', '2016']}
            placeholder="Select"
            onChange={handleDateChange}
            value={date}
          />
          <Select
            label="Type"
            options={['Javascript']}
            placeholder="Select"
            onChange={handleTypeChange}
            value={'Javascript'}
          />
        </div>
      </Card>
    );
  }
}
