/* global process */
import React, { Component } from 'react'
import Favicon from 'react-favicon'
import { Helmet } from 'react-helmet'
import { orderBy } from 'lodash'
import qs from 'qs'

import {
  Configure,
  InstantSearch,
  ToggleRefinement,
  RefinementList,
  CurrentRefinements,
} from 'react-instantsearch/dom'

import { withRouter } from 'react-router'
import styles from './ConferencePage.scss'
import './RefinementList.scss'
import './CurrentRefinement.scss'

import ScrollToConference from '../ScrollToConference'
import StayTuned from '../StayTuned'
import Footer from '../Footer'
import Link from '../Link'
import GithubStar from '../GithubStar'
import Heading from '../Heading'
import ConferenceList from '../ConferenceList'
import { TOPICS } from '../config'
import Search from '../Search'

const QUERY_SEPARATOR = '+'
const CURRENT_YEAR = new Date().getFullYear()
const TODAY = Math.round(new Date().getTime() / 1000)

interface Props {
  showCFP: boolean
  match: any
}

interface State {
  hitsPerPage: number
  sortBy: string
  showPast: boolean
  showNewsletterBanner: boolean
  refinementList?: any
}

type ComposedProps = Props & any

class ConferencePage extends Component<ComposedProps, State> {
  state: State = {
    hitsPerPage: 600,
    sortBy: 'startDate',
    showPast: false,
    showNewsletterBanner: false,
  }

  togglePast = () => {
    const { showPast } = this.state
    this.setState({ showPast: !showPast }, () => {
      window.scrollTo(0, 0)
    })
  }

  sortByCfpEndDate = () => {
    this.setState({
      sortBy: this.state.sortBy === 'cfpEndDate' ? 'startDate' : 'cfpEndDate',
    })
  }

  onSearchStateChange = (searchState: any) => {
    this.setState(
      {
        refinementList: searchState.refinementList || {},
      },
      () => {
        const {
          match: { params },
        } = this.props
        const {
          refinementList: { country, topics },
        } = this.state
        const { history, showCFP } = this.props
        const startURL = showCFP ? '/cfp' : ''
        const { online } = searchState.toggle

        const queryParams = {
          topics:
            topics === ''
              ? ''
              : (topics || [params.topic]).join(QUERY_SEPARATOR),
          countries:
            country === ''
              ? ''
              : (country || [params.country]).join(QUERY_SEPARATOR),
          online: online === '' ? '' : online || params.online,
        }

        switch (true) {
          case topics && country:
            return history.push(
              `${startURL}/${getFirstTopic(topics)}/${
                country[0]
              }?${qs.stringify(queryParams)}`
            )
          case topics:
            return history.push(
              `${startURL}/${getFirstTopic(topics)}?${qs.stringify(
                queryParams
              )}`
            )
          default:
            history.push(`${startURL}/?${qs.stringify(queryParams)}`)
        }
      }
    )
  }

  algoliaFilter = () => {
    const { showPast } = this.state
    const { showCFP } = this.props
    let filters = showPast ? `startDateUnix<${TODAY}` : `startDateUnix>${TODAY}`
    if (showCFP) {
      filters += String(` AND cfpEndDateUnix>${TODAY}`)
    }
    return filters
  }

  loadMore = () => {
    this.setState({
      hitsPerPage: this.state.hitsPerPage + 50,
    })
  }

  toggleNewsletter = () => {
    this.setState({ showNewsletterBanner: !this.state.showNewsletterBanner })
  }

  render() {
    const { showPast, sortBy, hitsPerPage, showNewsletterBanner } = this.state
    const {
      showCFP,
      match: {
        params: { topic, country },
      },
    } = this.props
    const queryParams = qs.parse(location.search.replace('?', ''))
    const topics =
      (queryParams.topics &&
        (queryParams.topics as string).split(QUERY_SEPARATOR)) ||
      (topic && [topic]) ||
      []
    const countries =
      (queryParams.countries &&
        (queryParams.countries as string).split(QUERY_SEPARATOR)) ||
      (country && [country]) ||
      []

    return (
      <div>
        <Helmet>
          <title>
            {topic ? TOPICS[topic] : 'Tech'} conferences in{' '}
            {`${CURRENT_YEAR} and ${CURRENT_YEAR + 1}`} | Confs.tech
          </title>
        </Helmet>
        <Favicon url={`/${topic}.png`} />
        <header className={styles.Header}>
          <div>
            <h1 className='visuallyHidden'>
              List of all {topic ? TOPICS[topic] : 'tech'} conferences in{' '}
              {CURRENT_YEAR} and {CURRENT_YEAR + 1}
              {country ? ` in ${country}` : null}
            </h1>
            <Heading element='p'>Find your next tech conference</Heading>
            <Heading element='h2' level='sub'>
              Open-source and crowd-sourced list of conferences around software
              development
            </Heading>
          </div>
          <GithubStar />
        </header>

        <InstantSearch
          appId={process.env.ALGOLIA_APPLICATION_ID}
          apiKey={process.env.ALGOLIA_API_KEY}
          onSearchStateChange={this.onSearchStateChange}
          indexName='prod_conferences'
        >
          <Configure hitsPerPage={hitsPerPage} filters={this.algoliaFilter()} />

          <Search />

          <RefinementList
            limit={40}
            attribute='topics'
            defaultRefinement={topics}
            transformItems={transformTopicRefinements}
          />
          <RefinementList
            showMoreLimit={100}
            limit={9}
            showMore
            attribute='country'
            transformItems={transformCountryRefinements}
            defaultRefinement={countries}
          />

          <ToggleRefinement
            attribute='online'
            label='Only show online conferences'
            value={true}
          />

          <CurrentRefinements transformItems={transformCurrentRefinements} />

          <p className={styles.topLinks}>
            <Link url={getCfpUrl(showCFP)}>
              {showCFP ? 'Hide Call for Papers' : 'Call for Papers'}
            </Link>

            <Link onClick={this.toggleNewsletter}>Newsletter</Link>

            <Link url='https://twitter.com/ConfsTech/' external>
              Twitter
            </Link>
          </p>

          {showNewsletterBanner && <StayTuned topic={getFirstTopic(topics)} />}

          {showCFP && (
            <CfpHeader
              sortByCfpEndDate={this.sortByCfpEndDate}
              sortBy={sortBy}
            />
          )}

          <ScrollToConference hash={location.hash} />

          <ConferenceList
            onLoadMore={this.loadMore}
            sortBy={sortBy}
            showCFP={showCFP}
          />
        </InstantSearch>

        <Footer
          showCFP={showCFP}
          cfpUrl={getCfpUrl(showCFP)}
          togglePast={this.togglePast}
          showPast={showPast}
        />
      </div>
    )
  }
}

function CfpHeader({ sortByCfpEndDate, sortBy }: any) {
  return (
    <div className={styles.CfpHeader}>
      <Heading element='h2' level={2}>
        Call for Papers
      </Heading>
      <div>
        Sorted by:{' '}
        <Link
          className={sortBy === 'startDate' ? styles.active : ''}
          button
          onClick={sortByCfpEndDate}
        >
          Conference start date
        </Link>
        {' / '}
        <Link
          className={sortBy === 'startDate' ? '' : styles.active}
          button
          onClick={sortByCfpEndDate}
        >
          CFP end date
        </Link>
      </div>
    </div>
  )
}

function transformTopicRefinements(items: any[]) {
  items.map((item) => {
    item.label = TOPICS[item.label] || item.label
    return item
  })
  return orderBy(items, ['count', 'name'], ['desc', 'desc'])
}

function transformCountryRefinements(items: any[]) {
  return orderBy(items, ['count', 'name'], ['desc', 'desc'])
}

function transformCurrentRefinements(items: any[]) {
  if (!items.length) {
    return []
  }

  const topics = items.find((item) => item.attribute === 'topics')
  // Change topic label
  if (topics) {
    topics.items.map((item: any) => {
      item.label = TOPICS[item.label] || item.label
      return item
    })
  }

  // Don't render 'online' refinement
  return (items || []).filter((item) => item.attribute !== 'online')
}

function getFirstTopic(topics: string[]) {
  if (topics.length > 1 && topics[0] === 'general') {
    return topics[1]
  }

  return topics[0]
}

function getCfpUrl(showCFP: boolean) {
  if (showCFP) {
    return `${location.pathname}`.replace('/cfp', '')
  } else {
    return `/cfp${location.pathname}`
  }
}

export default withRouter(ConferencePage)
