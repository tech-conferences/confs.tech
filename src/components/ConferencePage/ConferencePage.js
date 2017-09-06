import React, {Component} from 'react';
import {format, isPast} from 'date-fns';
import {uniq, sortBy} from 'lodash';
import Favicon from 'react-favicon';
import {Helmet} from 'react-helmet';

import styles from './ConferencePage.scss';
import Link from '../Link';
import GithubStar from '../GithubStar';
import Heading from '../Heading';
import Icon from '../Icon';
import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';
import {TYPES, getConferenceLink} from '../config';

const CURRENT_YEAR = (new Date()).getFullYear().toString();

export default class ConferencePage extends Component {
  state = {
    filters: {
      year: '2017',
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
    const {match: {params: {year, type, country}}} = props;
    if (!type) { return; }

    this.setState({
      filters: {
        year: year || CURRENT_YEAR,
        type,
        country,
      },
    }, callback);
  };

  componentDidMount() {
    this.loadConference();
  }

  loadConference = () => {
    const {lastLinkFetched, conferences, filters} = this.state;
    const link = getConferenceLink(filters);

    if (lastLinkFetched === link) { return conferences; }

    this.setState({loading: true, lastLinkFetched: link});

    return fetch(link)
      .then((result) => result.json())
      // eslint-disable-next-line promise/always-return
      .then((_conferences) => {
        this.setState({
          loading: false,
          conferences: _conferences,
        });
      })
      .catch((error) => {
        console.warn(error); // eslint-disable-line no-console
      });
  };

  togglePast = () => {
    const {showPast} = this.state;
    this.setState({showPast: !showPast});
  };

  pastConferenceToggler = () => {
    const {showPast, filters: {year}} = this.state;

    if (CURRENT_YEAR !== year) {
      return null;
    }

    return (
      <p>
        <Link onClick={this.togglePast}>
          {showPast ? 'Hide past conferences' : 'Show past conferences'}
        </Link>
      </p>
    );
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
      filters: {year, type, country},
    } = this.state;
    const conferencesFilteredByDate = filterConferencesByDate(conferences, showPast);
    const filteredConferences = this.filterConferences(conferencesFilteredByDate);

    return (
      <div>
        <Helmet>
          <title>{TYPES[type]} conferences in {year} | Confs.tech</title>
        </Helmet>
        <Favicon url={`/${type}.png`} />
        <div className={styles.Header}>
          <Heading element="h1">Find your next {TYPES[type]} conference</Heading>
          <GithubStar />
        </div>
        <div>
          <ConferenceFilter
            year={year}
            type={type}
            country={country}
            countries={getCountries(conferencesFilteredByDate)}
          />
          {this.pastConferenceToggler()}
        </div>
        <div>
          {loading
            ? Loader()
            : <ConferenceList
              conferences={filteredConferences}
              />
          }
        </div>
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
