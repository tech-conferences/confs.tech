import React, { Component } from 'react';
import {Link, Page, Layout, DisplayText} from '@shopify/polaris';

import ConferenceList from '../ConferenceList';
import ConferenceFilter from '../ConferenceFilter';

export default class App extends Component {
  state =  {
    filters: {
      date: 2017,
      type: 'javascript'
    },
    conferences: []
  }

  componentDidMount() {
    this.loadConference();
  }

  loadConference = () => {
    const {filters} = this.state;

    fetch(getConferenceLink(filters))
      .then( (result) => result.json())
      .then( (conferences) => {
        this.setState({conferences});
      });
  }

  handleDateChange = (date) => {
    const {filters} = this.state;

    this.setState({
      filters: {...filters, date}
    }, this.loadConference);
  }

  handleTypeChange = (type) => {
    const {filters} = this.state;

    this.setState({
      filters: {...filters, type}
    }, this.loadConference);
  }

  showDuplicates = (conferences) => {
    if (process.env.NODE_ENV !== 'development') { return null; }
    return (
      <ul>
        {getDuplicates(conferences).map((conf) =>
          <li>{conf.name}: {conf.url}</li>
        )}
      </ul>
    );
  }

  render() {
    const {conferences, filters: {date}} = this.state;

    return (
      <Page>
        <Layout>
          <Layout.Section>
            <DisplayText size="extraLarge">The conference list</DisplayText>
            <DisplayText size="small">An exaustive list</DisplayText>
          </Layout.Section>
          <Layout.Section>
            <ConferenceFilter
              date={date}
              onDateChange={this.handleDateChange}
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
            {this.showDuplicates(conferences)}
            <ConferenceList conferences={conferences} />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function getConferenceLink(state) {
  const {type, date} = state;

  return `https://raw.githubusercontent.com/nimzco/the-conference-list/master/conferences/${date}/${type}.json`
}

function getDuplicates(conferences) {
  const confURLs = conferences.map((conf) => conf.url)
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

