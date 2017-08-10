import React, { Component } from 'react';
import {Card} from '@shopify/polaris';
import ConferenceItem from '../ConferenceItem';
import './ConferenceList.css';

export default class ConferenceList extends Component {
  render() {
    const {conferences} = this.props;

    return (
      <Card sectioned>
        <table className="ConferenceList">
          <thead className="ConferenceList__head">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conf) => <ConferenceItem key={conf.url} {...conf} />)}
          </tbody>
        </table>
      </Card>
    );
  }
}
