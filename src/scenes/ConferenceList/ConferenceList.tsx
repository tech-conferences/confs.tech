import algoliasearch from 'algoliasearch/lite'
import qs from 'qs'
import React, { Component } from 'react'
import {
  Configure,
  InstantSearch,
  ToggleRefinement,
  RefinementList,
  CurrentRefinements,
} from 'react-instantsearch-dom'
import { withRouter } from 'react-router'
import { Search, Page, Link, ScrollToConference } from 'src/components'
import { TOPICS } from 'src/components/config'

import './RefinementList.scss'
import './CurrentRefinement.scss'

import styles from './ConferenceList.scss'
import { ConferenceList, NewsletterForm } from './components'
import { CFPHeader } from './components'
import {
  transformTopicRefinements,
  transformCountryRefinements,
  transformCurrentRefinements,
  getFirstTopic,
  getCfpUrl,
} from './utils'

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

const searchClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_API_KEY as string
)

class ConferenceListPage extends Component<ComposedProps, State> {
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
        const online = searchState.toggle ? searchState.toggle.online : false

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
        // These are sets in the url, when reaching through /ux/France for instance
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
      <Page
        htmlTitle={`${
          topic ? TOPICS[topic] : 'Tech'
        } conferences in ${CURRENT_YEAR} and ${CURRENT_YEAR + 1} | Confs.tech`}
        searchEngineTitle={`List of all ${
          topic ? TOPICS[topic] : 'tech'
        } conferences in ${CURRENT_YEAR} and ${CURRENT_YEAR + 1}${
          country ? ` in ${country}` : ''
        }`}
        title='Find your next tech conference'
        subtitle='Open-source and crowd-sourced list of conferences around software development'
      >
        <InstantSearch
          searchClient={searchClient}
          onSearchStateChange={this.onSearchStateChange}
          indexName='prod_conferences'
        >
          <Configure hitsPerPage={hitsPerPage} filters={this.algoliaFilter()} />
          <p className={styles.HeaderLinks}>
            <Link url={getCfpUrl(showCFP)}>
              {showCFP ? 'Hide Call for Papers' : 'Show Call for Papers'}
            </Link>
            <Link onClick={this.toggleNewsletter}>
              Subscribe to our Newsletter
            </Link>
            <Link url='https://github.com/tech-conferences/confs.tech' external>
              ★ on GitHub
            </Link>
          </p>

          {showNewsletterBanner && (
            <NewsletterForm topic={getFirstTopic(topics)} />
          )}

          {showCFP && (
            <CFPHeader
              sortByCfpEndDate={this.sortByCfpEndDate}
              sortBy={sortBy}
            />
          )}

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

          <div className={styles.ToggleRefinementsGroup}>
            <ToggleRefinement
              attribute='online'
              label='Only show online conferences'
              value={true}
            />

            <ToggleRefinement
              attribute='offersSignLanguageOrCC'
              label='Offers interpretation to International sign language or closed captions'
              value={true}
            />
          </div>

          <CurrentRefinements transformItems={transformCurrentRefinements} />

          <ScrollToConference hash={location.hash} />

          <ConferenceList
            onLoadMore={this.loadMore}
            sortBy={sortBy}
            showCFP={showCFP}
          />
        </InstantSearch>

        <p className={styles.FooterLinks}>
          <Link selected={showPast} onClick={this.togglePast}>
            {showPast ? 'Hide past conferences' : 'See past conferences'}
          </Link>
        </p>
      </Page>
    )
  }
}

export default withRouter(ConferenceListPage)
