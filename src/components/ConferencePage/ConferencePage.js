import React, {Component} from 'react';
import {format, isPast} from 'date-fns';
import {uniq, sortBy} from 'lodash';
import Favicon from 'react-favicon';
import {Helmet} from 'react-helmet';

import styles from './ConferencePage.scss';
import Footer from '../Footer';
import GithubStar from '../GithubStar';
import Heading from '../Heading';
import Icon from '../Icon';
import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';
import {
  TYPES,
  CURRENT_YEAR,
  getConferenceUrl,
  getAddConferenceUrl,
} from '../config';

export default class ConferencePage extends Component {
  state = {
    filters: {
      type: 'javascript',
      country: null,
    },
    lastLinkFetched: '',
    showPast: false,
    loading: true,
    conferences: [],
  };

  componentWillMount() {
    this.updateStateWithNewFilters(this.props, this.loadConference);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStateWithNewFilters(nextProps, this.loadConference);
  }

  updateStateWithNewFilters = (props, callback) => {
    const {match: {params: {type, country}}} = props;
    if (!type) { return; }

    this.setState({
      filters: {
        type,
        country,
      },
    }, callback);
  };

  componentDidMount() {
    this.loadConference();
  }

  loadConference = () => {
    const {lastLinkFetched, filters} = this.state;
    const conferenceURL = getConferenceUrl({...filters, year: CURRENT_YEAR});
    const conferenceURLNextYear = getConferenceUrl({...filters, year: CURRENT_YEAR + 1});

    if (lastLinkFetched === conferenceURL) { return; }

    this.setState({loading: true, conferences: [], lastLinkFetched: conferenceURL});

    Promise.all([
      this.fetchConfs(conferenceURL),
      this.fetchConfs(conferenceURLNextYear),
    // eslint-disable-next-line promise/always-return
    ]).then((results) => {
      const conferences = results.reduce((concat, current) => {
        return [...concat, ...current];
      }, []);
      this.setState({
        loading: false,
        conferences,
      });
    }).catch((error) => {
      console.warn(error); // eslint-disable-line no-console
    });
  };

  fetchConfs = (conferenceURL) => {
    return fetch(conferenceURL)
      .then((result) => {
        if (result.status === 404) { return []; }
        return result.json();
      })
      .catch((error) => {
        console.warn(error); // eslint-disable-line no-console
      });
  };

  togglePast = () => {
    const {showPast} = this.state;
    this.setState({showPast: !showPast}, () => {
      window.scrollTo(0, 0);
    });
  };

  filterConferences = (conferences) => {
    const {filters: {country}} = this.state;

    if (country) {
      return conferences.filter((conference) => {
        return conference.country === country;
      });
    }

    return conferences;
  };

  render() {
    const {
      loading,
      conferences,
      showPast,
      filters: {type, country},
    } = this.state;
    const conferencesFilteredByDate = filterConferencesByDate(conferences, showPast);
    const filteredConferences = this.filterConferences(conferencesFilteredByDate);
    const addConferenceUrl = getAddConferenceUrl(type);

    // Fallback is only defined for `/:type/:country` paths.
    // Avoids displaying an error when looking for a country with no conf for `type` yet.
    if (!loading && filteredConferences.length === 0) {
      const {fallback} = this.props;
      if (typeof fallback === 'function') {
        return fallback(type);
      }
    }

    return (
      <div>
        <Helmet>
          <title>{TYPES[type]} conferences | Confs.tech</title>
        </Helmet>
        <Favicon url={`/${type}.png`} />
        <div className={styles.Header}>
          <Heading element="h1">Find your next {TYPES[type]} conference</Heading>
          <GithubStar />
        </div>
        <div>
          <ConferenceFilter
            type={type}
            country={country}
            countries={getCountries(conferencesFilteredByDate)}
          />
        </div>
        <div>
          {loading
            ? Loader()
            : <ConferenceList
              conferences={filteredConferences}
              />
          }
        </div>
        <Footer
          addConferenceUrl={addConferenceUrl}
          togglePast={this.togglePast}
          showPast={showPast}
        />
      </div>
    );
  }
}

function Loader() {
  return (
    <div className={styles.Loader}>
      <Icon source="loading" size={64} />
    </div>
  );
}

function getCountries(conferences) {
  return sortBy(uniq(conferences.map((conference) => conference.country)));
}

function filterConferencesByDate(conferences, showPast) {
  if (showPast) { return conferences; }

  return conferences.filter((conference) => {
    return !isPast(format(conference.startDate));
  });
}
