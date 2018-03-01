/* global process */
import React, {Component} from 'react';
import Favicon from 'react-favicon';
import {Helmet} from 'react-helmet';
import {orderBy} from 'lodash';
import {
  Configure,
  InstantSearch,
  RefinementList,
  CurrentRefinements,
} from 'react-instantsearch/dom';

import {withRouter} from 'react-router';
import styles from './ConferencePage.scss';
import './RefinementList.scss';
import './CurrentRefinement.scss';
import Footer from '../Footer';
import Link from '../Link';
import GithubStar from '../GithubStar';
import Heading from '../Heading';
import ConferenceList from '../ConferenceList';
import {TOPICS} from '../config';

const CURRENT_YEAR = (new Date()).getYear() + 1900;
const TODAY = Math.round(new Date().getTime() / 1000);
const ONE_YEAR = 365 * 24 * 60 * 60;

class ConferencePage extends Component {
  state = {
    hitsPerPage: 150,
    sortBy: 'startDate',
    showPast: false,
  };

  togglePast = () => {
    const {showPast} = this.state;
    this.setState({showPast: !showPast}, () => {
      window.scrollTo(0, 0);
    });
  };

  sortByCfpEndDate = () => {
    this.setState({
      sortBy: this.state.sortBy === 'cfpEndDate' ? 'startDate' : 'cfpEndDate',
    });
  };

  onSearchStateChange = (searchState) => {
    this.setState({
      refinementList: searchState.refinementList || {},
    }, () => {
      const {refinementList: {country, topics}} = this.state;
      const {history, showCFP} = this.props;
      const startURL = showCFP ? '/cfp' : '';
      if (topics && country) {
        history.push(`${startURL}/${topics[0]}/${country[0]}`);
      } else if (topics) {
        history.push(`${startURL}/${topics[0]}`);
      } else {
        history.push(`${startURL}/`);
      }
    });
  };

  algoliaFilter = () => {
    const {showPast} = this.state;
    const {showCFP} = this.props;
    let filters = showPast ? `startDateUnix>${TODAY - ONE_YEAR}` : `startDateUnix>${TODAY}`;
    if (showCFP) {
      filters += String(` AND cfpEndDateUnix>${TODAY}`);
    }
    return filters;
  };

  loadMore = () => {
    this.setState({
      hitsPerPage: (this.state.hitsPerPage + 50),
    });
  };

  render() {
    const {showPast, sortBy, hitsPerPage} = this.state;
    const {showCFP, match: {params: {topic, country}}} = this.props;

    return (
      <div>
        <Helmet>
          <title>Tech conferences | Confs.tech</title>
        </Helmet>
        <Favicon url={`/${topic}.png`} />
        <header className={styles.Header}>
          <h1 className="visuallyHidden">
            List of all {topic ? TOPICS[topic] : 'tech'} conferences of {CURRENT_YEAR}
            {country ? ` in ${country}` : null}
          </h1>
          <Heading element="p">Find your next tech conference</Heading>
          <GithubStar />
        </header>

        <InstantSearch
          appId={process.env.ALGOLIA_APPLICATION_ID}
          apiKey={process.env.ALGOLIA_API_KEY}
          onSearchStateChange={this.onSearchStateChange}
          indexName={'prod_conferences'}
        >
          <Configure
            hitsPerPage={hitsPerPage}
            filters={this.algoliaFilter()}
          />
          <RefinementList
            attributeName="topics"
            defaultRefinement={topic ? [topic] : []}
            transformItems={transformTopicRefinements}
          />
          <RefinementList
            limitMin={9}
            limitMax={100}
            showMore
            attributeName="country"
            transformItems={transformCountryRefinements}
            defaultRefinement={country ? [country] : []}
          />

          <CurrentRefinements
            transformItems={transformCurrentRefinements}
          />

          {showCFP && <CfpHeader sortByCfpEndDate={this.sortByCfpEndDate} sortBy={sortBy} />}

          <ConferenceList
            onLoadMore={this.loadMore}
            sortBy={sortBy}
            showCFP={showCFP}
          />
        </InstantSearch>

        <Footer
          showCFP={showCFP}
          togglePast={this.togglePast}
          showPast={showPast}
        />
      </div>
    );
  }
}

function CfpHeader({sortByCfpEndDate, sortBy}) {
  return (
    <div className={styles.CfpHeader}>
      <Heading element="h2" level={2}>Call For Papers</Heading>
      <Link
        button
        onClick={sortByCfpEndDate}
      >
        {sortBy === 'startDate'
          ? 'Start date ⬇'
          : 'CFP end date ⬇'
        }
      </Link>
    </div>
  );
}

function transformTopicRefinements(items) {
  items.map((item) => {
    item.label = TOPICS[item.label];
    return item;
  });
  return orderBy(items, ['count', 'name'], ['desc', 'desc']);
}

function transformCountryRefinements(items) {
  return orderBy(items, ['count', 'name'], ['desc', 'desc']);
}

function transformCurrentRefinements(items) {
  if (items.length && items[0].attributeName === 'topics') {
    items[0].items.map((item) => {
      item.label = TOPICS[item.label] || item.label;
      return item;
    });
  }
  return items;

}

export default withRouter(ConferencePage);
