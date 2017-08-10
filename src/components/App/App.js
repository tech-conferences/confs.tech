import React, { Component } from 'react';
import {isEqual} from 'lodash';
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

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  componentDidMount() {
    loadConference(this.state.filters).then( (conferences) => {
      this.setState({conferences});
    });
  }

  componentWillUpdate(nextProps, nextState) {
    loadConference(nextState.filters).then( (conferences) => {
      this.setState({conferences});
    });
  }

  handleDateChange = (date) => {
    const {filters} = this.state;

    this.setState({filters: {...filters, date}});
  }

  handleTypeChange = (type) => {
    const {filters} = this.state;

    this.setState({filters: {...filters, type}});
  }

  render() {
    const {conferences, filters: {date, type}} = this.state;

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
              handleDateChange={this.handleDateChange}
              handleTypeChange={this.handleTypeChange}
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

function loadConference(filters) {
  return fetch(getConferenceLink(filters))
    .then( (result) => result.json())
}
