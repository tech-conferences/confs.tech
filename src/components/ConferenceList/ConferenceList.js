import React, { Component } from 'react';
import {Link, Card} from '@shopify/polaris';
import ConferenceItem from '../ConferenceItem';
import './ConferenceList.css';

export default class ConferenceList extends Component {
  state = {
    sortDateDirection: 'asc'
  }

  sortConferencesByDate = () => {
    const {sortByDate} = this.props;
    const {sortDateDirection} = this.state;
    const newSortDateDirection = (sortDateDirection == 'desc' ? 'asc' : 'desc');

    sortByDate(newSortDateDirection);
    this.setState({sortDateDirection: newSortDateDirection});
  }

  renderTable = () => {
    const {conferences} = this.props;
    const {sortDateDirection} = this.state;

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
                  Date {sortDateDirection == 'asc' ? '⬇' : '⬆'}
                </Link>
              </th>
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
