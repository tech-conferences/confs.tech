import React, {Component} from 'react';
import {format, isPast} from 'date-fns';
import Favicon from 'react-favicon';
import {Helmet} from 'react-helmet';

import styles from './ConferencePage.scss';
import Link from '../Link';
import Heading from '../Heading';
import Icon from '../Icon';
import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';

const BASE_URL = 'https://raw.githubusercontent.com/nimzco/confs.tech/master/conferences';
const CURRENT_YEAR = (new Date()).getFullYear().toString();
const TYPES = {
  javascript: 'JavaScript',
  ux: 'UX',
  ruby: 'Ruby',
};

export default class ConferencePage extends Component {
  state = {
    filters: {
      year: '2017',
      type: 'javascript',
    },
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
    const {filters} = this.state;
    this.setState({loading: true});

    fetch(getConferenceLink(filters))
      .then((result) => result.json())
      // eslint-disable-next-line promise/always-return
      .then((conferences) => {
        this.setState({
          loading: false,
          conferences,
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
    const {showPast} = this.state;

    if (showPast) {
      return conferences;
    }

    return conferences.filter((conference) => {
      return !isPast(format(conference.startDate));
    });
  };

  render() {
    const {
      loading,
      conferences,
      filters: {year, type},
    } = this.state;

    return (
      <div>
        <Helmet>
          <title>{TYPES[type]} conferences in {year} | Confs.tech</title>
        </Helmet>
        <Favicon url={`${type}.png`} />
        <div>
          <Heading element="h1">Find your next {TYPES[type]} conference</Heading>
        </div>
        <div>
          <ConferenceFilter
            year={year}
            type={type}
          />
          {this.pastConferenceToggler()}
        </div>
        <div>
          {loading
            ? Loader()
            : <ConferenceList
              conferences={this.filterConferences(conferences)}
              />
          }
        </div>
      </div>
    );
  }
}

function getConferenceLink(state) {
  const {type, year} = state;
  return `${BASE_URL}/${year}/${type.toLocaleLowerCase()}.json`;
}

function Loader() {
  return (
    <div className={styles.Loader}>
      <Icon source="loading" size={64} />
    </div>
  );
}
