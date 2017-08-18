import React, { Component } from 'react';
import {Link, Card} from '@shopify/polaris';
import {groupBy} from 'lodash'
import {parse, format} from 'date-fns'

import ConferenceItem from '../ConferenceItem';
import './ConferenceList.css';

export default class ConferenceList extends Component {
  state = {
    sortDateDirection: 'asc',
  }

  sortConferencesByDate = () => {
    const {sortByDate} = this.props;
    const {sortDateDirection} = this.state;
    const newSortDateDirection = (sortDateDirection === 'desc' ? 'asc' : 'desc');

    sortByDate(newSortDateDirection);
    this.setState({sortDateDirection: newSortDateDirection});
  }

  renderMonth = (month, conferences) => {
    return [
      (<tr><td colSpan={3}><strong>{getMonthName(month)}</strong></td></tr>),
      conferences.map((conf) => {
        return (
          <ConferenceItem
            key={`${conf.url} ${conf.date}`} {...conf}
          />)
      })
    ]
  }

  renderTable = () => {
    const {conferences} = this.props;
    const {sortDateDirection} = this.state;
    const groupedConferences = groupBy(conferences, (conf) => format(conf.startDate, 'M'));

    if (conferences.length === 0) {
      return (<div>Oh shoe... We don't have any conferences yet. :(</div>)
    } else {
      return (
        <table className="ConferenceList">
          <thead className="ConferenceList__head">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>
                <Link onClick={this.sortConferencesByDate}>
                  Date {sortDateDirection === 'asc' ? '⬇' : '⬆'}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedConferences).map(((month) => {
              return this.renderMonth(month, groupedConferences[month]);
            }))}
          </tbody>
        </table>
      )
    }
  }

  render() {
    return (
      <Card sectioned>
        {this.renderTable()}
      </Card>
    );
  }
}

function getMonthName(month) {
  return format(parse(`2017/${month}/01`), 'MMMM');
}
