import React, {Component} from 'react';
import styles from './ConferenceFilter.css';
import Link from '../Link';
import {TYPES} from '../config';

export default class ConferenceFilter extends Component {
  getUrl = (filters) => {
    const {type} = this.props;

    if (filters.country) {
      return `/${filters.type || type}/${filters.country}`;
    } else {
      return `/${filters.type || type}`;
    }
  };

  render() {
    const {type, country, countries} = this.props;

    return (
      <div className={styles.ConferenceFilterWrapper}>
        <div className={styles.ConferenceFilter}>
          {Types(type, this.getUrl)}
        </div>
        <div className={styles.ConferenceFilter}>
          {Countries(countries, country, this.getUrl)}
        </div>
      </div>
    );
  }
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
          url={getUrl({country: country.trim()})}
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
