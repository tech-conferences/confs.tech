import React, {Component} from 'react';
import styles from './ConferenceFilter.css';
import Link from '../Link';

const YEARS = ['2017', '2018'];
const TYPES = {
  javascript: 'JavaScript',
  ux: 'UX',
  ruby: 'Ruby',
};

export default class ConferenceFilter extends Component {
  handleYearClick = (event) => {
    const {onYearChange} = this.props;

    onYearChange(event.target.dataset.value);
  };

  handleTypeClick = (event) => {
    const {onTypeChange} = this.props;

    onTypeChange(event.target.dataset.value);
  };

  render() {
    const {year, type} = this.props;

    return (
      <div>
        <div className={styles.ConferenceFilterWrapper}>
          <div className={styles.ConferenceFilter}>
            {Years(year, this.handleYearClick)}
          </div>
          <div className={styles.ConferenceFilter}>
            {Types(type, this.handleTypeClick)}
          </div>
        </div>
      </div>
    );
  }
}

function Years(selectedYear, handleClick) {
  return YEARS.map((year) => {
    return (
      <div key={year} className={styles.Filter}>
        <Link
          selected={selectedYear === year}
          onClick={handleClick}
          dataValue={year}
        >
          {year}
        </Link>
      </div>
    );
  });
}

function Types(selectedType, handleClick) {
  return Object.keys(TYPES).map((type) => {
    return (
      <div key={type} className={styles.Filter}>
        <Link
          selected={selectedType === type}
          onClick={handleClick}
          dataValue={type}
        >
          {TYPES[type]}
        </Link>
      </div>
    );
  });
}
