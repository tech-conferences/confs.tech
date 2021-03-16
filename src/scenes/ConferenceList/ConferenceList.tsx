import algoliasearch from 'algoliasearch/lite'
import qs from 'qs'
import React, { useState } from 'react'
import {
  Configure,
  InstantSearch,
  ToggleRefinement,
  RefinementList,
  CurrentRefinements,
  connectStats,
} from 'react-instantsearch-dom'
import { useHistory, useParams } from 'react-router'
import { Search, Page, Link, ScrollToConference } from 'src/components'
import { TOPICS } from 'src/components/config'
import { useToggle } from 'src/hooks'

import './RefinementList.scss'
import './CurrentRefinement.scss'

import styles from './ConferenceList.scss'
import { ConferenceList, NewsletterForm } from './components'
import { CFPHeader } from './components'
import {
  transformTopicRefinements,
  transformCountryRefinements,
  transformCurrentRefinements,
  paramsFromUrl,
  getFirstTopic,
  getCfpUrl,
  QUERY_SEPARATOR,
} from './utils'

const CURRENT_YEAR = new Date().getFullYear()
const TODAY = Math.round(new Date().getTime() / 1000)

interface Props {
  showCFP: boolean
}

interface SearchState {
  toggle: {
    online: boolean
    offersSignLanguageOrCC: boolean
  }
  refinementList: {
    countries: string[]
    topics: string[]
  }
}

const searchClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_API_KEY as string
)

const ConferenceListPage: React.FC<Props> = ({ showCFP }) => {
  const [hitsPerPage, setHitsPerPage] = useState(600)
  const [sortBy, setSortBy] = useState('startDate')
  const [showPast, setShowPast] = useState(false)
  const [showNewsletterBanner, toggleNewsletterBanner] = useToggle(false)
  const history = useHistory()

  // These are sets in the url, when reaching through /ux/France for instance
  // See routes definitions in App.tsx
  const { topic, country } = useParams<{
    topic: string
    country: string
  }>()

  const urlQueryString = qs.parse(window.location.search.replace('?', ''))

  const [searchState, setSearchState] = useState<SearchState>({
    toggle: {
      online: Boolean(urlQueryString.online),
      offersSignLanguageOrCC: Boolean(urlQueryString.offersSignLanguageOrCC),
    },
    refinementList: {
      countries:
        paramsFromUrl(urlQueryString, 'countries') || [country].filter(Boolean), // Removes nullish values,
      topics:
        paramsFromUrl(urlQueryString, 'topics') || [topic].filter(Boolean), // Removes nullish values,
    },
  })

  const togglePast = () => {
    setShowPast(!showPast)
    window.scrollTo(0, 0)
  }

  const sortByCfpEndDate = () => {
    setSortBy(sortBy === 'cfpEndDate' ? 'startDate' : 'cfpEndDate')
  }

  const updateUrlQueryParams = (algoliaSearchState: SearchState) => {
    setSearchState(algoliaSearchState)

    history.push(
      `?${qs.stringify({
        online: algoliaSearchState.toggle.online,
        offersSignLanguageOrCC:
          algoliaSearchState.toggle.offersSignLanguageOrCC,
        countries: (algoliaSearchState.refinementList.countries || []).join(
          QUERY_SEPARATOR
        ),
        topics: (algoliaSearchState.refinementList.topics || []).join(
          QUERY_SEPARATOR
        ),
      })}`
    )
  }

  const algoliaFilter = () => {
    let filters = showPast ? `startDateUnix<${TODAY}` : `startDateUnix>${TODAY}`
    if (showCFP) {
      filters += String(` AND cfpEndDateUnix>${TODAY}`)
    }
    return filters
  }

  const loadMore = () => {
    setHitsPerPage(hitsPerPage + 50)
  }

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
        onSearchStateChange={updateUrlQueryParams}
        searchState={searchState}
        indexName='prod_conferences'
      >
        <Configure hitsPerPage={hitsPerPage} filters={algoliaFilter()} />
        <p className={styles.HeaderLinks}>
          <Link url={getCfpUrl(showCFP)}>
            {showCFP ? 'Hide Call for Papers' : 'Show Call for Papers'}
          </Link>
          <Link onClick={toggleNewsletterBanner}>
            Subscribe to our Newsletter
          </Link>
          <Link url='https://github.com/tech-conferences/confs.tech' external>
            ★ on GitHub
          </Link>
        </p>

        {showNewsletterBanner && (
          <NewsletterForm
            topic={getFirstTopic(searchState.refinementList.topics)}
          />
        )}

        {showCFP && (
          <CFPHeader sortByCfpEndDate={sortByCfpEndDate} sortBy={sortBy} />
        )}

        <Search />

        <RefinementList
          limit={40}
          attribute='topics'
          defaultRefinement={(searchState.refinementList.topics || []).filter(
            Boolean
          )}
          transformItems={transformTopicRefinements}
        />
        <RefinementList
          showMoreLimit={100}
          limit={9}
          showMore
          attribute='country'
          transformItems={transformCountryRefinements}
          defaultRefinement={(
            searchState.refinementList.countries || []
          ).filter(Boolean)}
        />

        <div className={styles.ToggleRefinementsGroup}>
          <ToggleRefinement
            attribute='online'
            label='Online conferences'
            value={true}
            defaultRefinement={searchState.toggle.online}
          />

          <ToggleRefinement
            attribute='offersSignLanguageOrCC'
            label='Offers interpretation to International sign language or closed captions'
            value={true}
            defaultRefinement={searchState.toggle.offersSignLanguageOrCC}
          />
        </div>

        <div className={styles.CurrentRefinements}>
          <CurrentRefinements transformItems={transformCurrentRefinements} />
          <ShowingResulstsCount />
        </div>

        <ScrollToConference hash={location.hash} />

        <ConferenceList
          onLoadMore={loadMore}
          sortBy={sortBy}
          showCFP={showCFP}
        />
      </InstantSearch>

      <p className={styles.FooterLinks}>
        <Link selected={showPast} onClick={togglePast}>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
        </Link>
      </p>
    </Page>
  )
}

const ShowingResulstsCount = connectStats(({ nbHits }) => {
  return (
    <p className={styles.HitsCount}>
      <i>Showing {nbHits} conferences</i>
    </p>
  )
})
export default ConferenceListPage
