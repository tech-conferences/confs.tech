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
  getUrl = (filters) => {
    const {year, type} = this.props;

    if (filters.country) {
      return `/${filters.year || year}/${filters.type || type}/${filters.country}`;
    } else {
      return `/${filters.year || year}/${filters.type || type}`;
    }
  };

  render() {
    const {year, type, country, countries} = this.props;

    return (
      <div>
        <div className={styles.ConferenceFilterWrapper}>
          <div className={styles.ConferenceFilter}>
            {Years(year, this.getUrl)}
          </div>
          <div className={styles.ConferenceFilter}>
            {Types(type, this.getUrl)}
          </div>
        </div>
        <div>
          <div className={styles.ConferenceFilter}>
            {Countries(countries, country, this.getUrl)}
          </div>
        </div>
      </div>
    );
  }
}

function Years(selectedYear, getUrl) {
  return YEARS.map((year) => {
    return (
      <div key={year} className={styles.Filter}>
        <Link
          url={getUrl({year})}
          selected={selectedYear === year}
          routed
        >
          {year}
        </Link>
      </div>
    );
  });
}

function Types(selectedType, getUrl) {
  return Object.keys(TYPES).map((type) => {
    return (
      <div key={type} className={styles.Filter}>
        <Link
          url={getUrl({type})}
          selected={selectedType === type}
          routed
        >
          {TYPES[type]}
        </Link>
      </div>
    );
  });
}

function Countries(countries, selectedCountry, getUrl) {
  const countriesNode = countries.map((country) => {
    return (
      <div key={country} className={styles.Filter}>
        <Link
          url={getUrl({country})}
          selected={selectedCountry === country}
          routed
        >
          {country}
        </Link>
      </div>
    );
  });

  const allCountryLink = (
    <div key="all-countries" className={styles.Filter}>
      <Link
        url={getUrl({country: null})}
        selected={!selectedCountry}
        routed
      >
        All countries
      </Link>
    </div>
  );

  return [allCountryLink, ...countriesNode];
}
