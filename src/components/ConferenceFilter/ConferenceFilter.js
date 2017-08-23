import React, { Component } from 'react';
import styles from './ConferenceFilter.css';
import Link from '../Link';
import Select from '../Select';

export default class ConferenceFilter extends Component {
  sortConferencesByDate = () => {
    const { sortDateDirection, sortByDate } = this.props;
    const newSortDateDirection = sortDateDirection === 'desc' ? 'asc' : 'desc';

    sortByDate(newSortDateDirection);
    this.setState({ sortDateDirection: newSortDateDirection });
  };

  render() {
    const {
      sortDateDirection,
      year,
      type,
      onYearChange,
      onTypeChange
    } = this.props;

    return (
      <div>
        <div className={styles.ConferenceFilter}>
          <Select
            label="Date"
            options={[['2017', '2017'], ['2018', '2018']]}
            onChange={onYearChange}
            value={year}
          />
          <Select
            label="Type"
            options={[
              ['JavaScript', 'javascript'],
              ['UX', 'ux'],
              ['Ruby', 'ruby']
            ]}
            onChange={onTypeChange}
            value={type}
          />
          <Link onClick={this.sortConferencesByDate}>
            Sort by date {sortDateDirection === 'asc' ? '⬇' : '⬆'}
          </Link>
        </div>
      </div>
    );
  }
}
