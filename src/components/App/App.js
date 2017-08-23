import React, {Component} from 'react';
import {format, isPast} from 'date-fns';

import {sortByDate} from './utils';
import styles from './App.scss';
import Footer from '../Footer';
import Link from '../Link';
import Heading from '../Heading';
import Icon from '../Icon';
import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';

const BASE_URL = 'https://raw.githubusercontent.com/nimzco/confs.tech/master/conferences';
const CURRENT_YEAR = (new Date()).getFullYear().toString();

export default class App extends Component {
  state = {
    filters: {
      year: '2017',
      type: 'javascript',
    },
    showPast: false,
    loading: true,
    conferences: [],
    sortDateDirection: 'asc',
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
          conferences: sortByDate(conferences, 'asc'),
        });
      })
      .catch((error) => {
        console.warn(error); // eslint-disable-line no-console
      });
  };

  handleYearChange = (year) => {
    const {filters} = this.state;

    this.setState(
      {
        filters: {...filters, year},
      },
      this.loadConference
    );
  };

  handleTypeChange = (type) => {
    const {filters} = this.state;

    this.setState(
      {
        filters: {...filters, type},
      },
      this.loadConference
    );
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

  sortByDate = (direction) => {
    const {conferences} = this.state;

    this.setState({
      conferences: sortByDate(conferences, direction),
      sortDateDirection: direction,
    });
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
      sortDateDirection,
      loading,
      conferences,
      filters: {year, type},
    } = this.state;

    return (
      <div className={styles.App}>
        <div>
          <div>
            <Heading element="h1">Find your next {TYPES[type]} conference</Heading>
          </div>
          <div>
            <ConferenceFilter
              sortDateDirection={sortDateDirection}
              sortByDate={this.sortByDate}
              year={year}
              type={type}
              onYearChange={this.handleYearChange}
              onTypeChange={this.handleTypeChange}
            />
            {this.pastConferenceToggler()}
          </div>
          <div>
            {loading
              ? Loader()
              : <ConferenceList
                sortDateDirection={sortDateDirection}
                conferences={this.filterConferences(conferences)}
                />
            }
          </div>
          <Footer />
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
