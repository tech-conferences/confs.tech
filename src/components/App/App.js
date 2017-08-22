import React, { Component } from 'react';
import './App.css';
import { Link, Page, Layout, DisplayText } from '@shopify/polaris';
import { format, isPast, compareAsc, compareDesc } from 'date-fns';

import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';

export default class App extends Component {
  state = {
    filters: {
      year: '2017',
      type: 'javascript'
    },
    showPast: false,
    loading: true,
    conferences: []
  };

  componentDidMount() {
    this.loadConference();
  }

  loadConference = () => {
    const { filters } = this.state;

    fetch(getConferenceLink(filters))
      .then(result => result.json())
      .then(conferences => {
        this.setState({
          loading: false,
          conferences: sortByDate(conferences, 'asc')
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleYearChange = year => {
    const { filters } = this.state;

    this.setState(
      {
        filters: { ...filters, year }
      },
      this.loadConference
    );
  };

  handleTypeChange = type => {
    const { filters } = this.state;

    this.setState(
      {
        filters: { ...filters, type }
      },
      this.loadConference
    );
  };

  togglePast = () => {
    const { showPast } = this.state;
    this.setState({ showPast: !showPast });
  };

  pastConferenceToggler = () => {
    const { showPast, filters: { year } } = this.state;
    const activeYear = new Date().getFullYear().toString() === year;

    if (!activeYear) {
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

  showDuplicates = conferences => {
    if (process.env.NODE_ENV !== 'development') {
      return null;
    }
    return (
      <ul>
        <li>
          <strong>DUPLICATES</strong>
        </li>
        {getDuplicates(conferences).map(conf =>
          <li>
            {conf.name}: {conf.url}
          </li>
        )}
      </ul>
    );
  };

  sortByDate = direction => {
    const { conferences } = this.state;

    this.setState({
      conferences: sortByDate(conferences, direction)
    });
  };

  filterConferences = conferences => {
    const { showPast } = this.state;

    if (showPast) {
      return conferences;
    }

    return conferences.filter(conference => {
      return !isPast(format(conference.startDate));
    });
  };

  render() {
    const { loading, conferences, filters: { year, type } } = this.state;

    return (
      <Page>
        <Layout>
          <Layout.Section>
            <DisplayText size="extraLarge">
              Find your next conference
            </DisplayText>
          </Layout.Section>
          <Layout.Section>
            <ConferenceFilter
              year={year}
              type={type}
              onYearChange={this.handleYearChange}
              onTypeChange={this.handleTypeChange}
            />
          </Layout.Section>
          <Layout.Section>
            <Link
              url="https://github.com/nimzco/the-conference-list/issues/new"
              external
            >
              Add a conference
            </Link>
          </Layout.Section>
          <Layout.Section>
            {loading
              ? '...'
              : <ConferenceList
                  conferences={this.filterConferences(conferences)}
                  sortByDate={this.sortByDate}
                />}
          </Layout.Section>
          <Layout.Section>
            <p>
              Maintained by&nbsp;
              <Link url="https://github.com/nimzco" external>
                @nimzco
              </Link>
            </p>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function getConferenceLink(state) {
  const { type, year } = state;
  return `https://raw.githubusercontent.com/nimzco/the-conference-list/master/conferences/${year}/${type.toLocaleLowerCase()}.json`;
}

function getDuplicates(conferences) {
  const confURLs = conferences.map(conf => conf.url);
  const duplicates = [];

  Object.keys(conferences).forEach((key, index) => {
    const url = conferences[key].url;
    if (confURLs.indexOf(url, index + 1) !== -1) {
      if (duplicates.indexOf(url) === -1) {
        duplicates.push(conferences[key]);
      }
    }
  });
  return duplicates;
}

function sortByDate(items, direction) {
  const compFunc = direction === 'asc' ? compareAsc : compareDesc;

  return Array.from(items).sort((itemA, itemB) => {
    return compFunc(itemA.startDate, itemB.startDate);
  });
}
