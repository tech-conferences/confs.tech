import React, { Component } from 'react';
import {Card} from '@shopify/polaris';
import ConferenceItem from '../ConferenceItem';
import './ConferenceList.css';

export default class ConferenceList extends Component {
  renderTable = () => {
    const {conferences} = this.props;

    if (conferences.length === 0) {
      return (<div>No conferences!</div>)
    } else {
      return (
        <table className="ConferenceList">
          <thead className="ConferenceList__head">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conf) => <ConferenceItem key={`${conf.url} ${conf.date}`} {...conf} />)}
          </tbody>
        </table>
      )
    }
  }

  render() {
    const {conferences} = this.props;

    return (
      <Card sectioned>
        {this.renderTable()}
      </Card>
    );
  }
}
