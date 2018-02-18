import React, {Component} from 'react';
import styles from './ConferenceFilter.css';
import Link from '../Link';
import {TYPES} from '../config';

export default class ConferenceFilter extends Component {
  getUrl = (filters) => {
    const {type, country, showCFP} = this.props;
    let url = '';
    if (filters.country) {
      url = `${filters.type || type}/${filters.country}`;
    } else if (filters.country === null || !country) {
      url = `${filters.type || type}`;
    } else {
      url = `${filters.type || type}/${country}`;
    }
    return `${showCFP ? '/cfp' : ''}/${url}`;
  };

  render() {
    const {type, country, countries} = this.props;

    return (
      <div className={styles.ConferenceFilterWrapper}>
        <div className={styles.ConferenceFilter}>
          <Types type={type} getUrl={this.getUrl} />
        </div>
        <div className={styles.ConferenceFilter}>
          <Countries countries={countries} country={country} getUrl={this.getUrl} />
        </div>
      </div>
    );
  }
}

function Types({type, getUrl}) {
  return Object.keys(TYPES).map((_type) => {
    return (
      <div key={_type} className={styles.Filter}>
        <Link
          url={getUrl({type: _type})}
          selected={type === _type}
          routed
        >
          {TYPES[_type]}
        </Link>
      </div>
    );
  });
}

function Countries({countries, country, getUrl}) {
  const countriesNode = countries.map((_country) => {
    return (
      <div key={_country} className={styles.Filter}>
        <Link
          url={getUrl({country: _country.trim()})}
          selected={country === _country}
          routed
        >
          {_country}
        </Link>
      </div>
    );
  });

  const allCountryLink = (
    <div key="all-countries" className={styles.Filter}>
      <Link
        url={getUrl({country: null})}
        selected={!country}
        routed
      >
        All countries
      </Link>
    </div>
  );

  return [allCountryLink, ...countriesNode];
}
