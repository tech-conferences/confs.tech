import React, { Component } from 'react';
import styles from './ConferenceFilter.css';
import Select from '../Select';

export default class ConferenceFilter extends Component {
  render() {
    const { year, type, onYearChange, onTypeChange } = this.props;

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
        </div>
      </div>
    );
  }
}
