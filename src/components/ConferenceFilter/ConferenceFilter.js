import React, { Component } from 'react';
import {Select, Card} from '@shopify/polaris';
import './ConferenceFilter.css';

export default class ConferenceFilter extends Component {
  render() {
    const {date, type, onDateChange, onTypeChange} = this.props;

    return (
      <Card sectioned>
        <div className="ConferenceFilter">
          <Select
            label="Date"
            options={['2017', '2018']}
            placeholder="Select"
            onChange={onDateChange}
            value={date}
          />
          <Select
            label="Type"
            options={['JavaScript', 'UX', 'Ruby']}
            placeholder="Select"
            onChange={onTypeChange}
            value={type}
          />
        </div>
      </Card>
    );
  }
}
