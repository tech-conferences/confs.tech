import algoliasearch from 'algoliasearch/lite'
import { subMonths } from 'date-fns'
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

import './RefinementList.module.scss'
import './CurrentRefinement.module.scss'

import styles from './ConferenceList.module.scss'
import { ConferenceList, NewsletterForm } from './components'
import { CFPHeader } from './components'
import {
  transformTopicRefinements,
  transformCountryRefinements,
  transformCurrentRefinements,
  paramsFromUrl,
  getFirstTopic,
  getCfpUrl,
  dateToTime,
  QUERY_SEPARATOR,
} from './utils'

const CURRENT_YEAR = new Date().getFullYear()
const TODAY = new Date()

interface Props {
  showCFP: boolean
}

interface SearchState {
  toggle: {
    online: boolean
    offersSignLanguageOrCC: boolean
  }
  refinementList: {
    continent?: string[]
    country?: string[]
    topics: string[]
  }
}

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID as string,
  process.env.REACT_APP_ALGOLIA_API_KEY as string
)

const ConferenceListPage: React.FC<Props> = ({ showCFP }) => {
  const urlQueryString = qs.parse(window.location.search.replace('?', ''))

  const [hitsPerPage, setHitsPerPage] = useState(600)
  const [sortBy, setSortBy] = useState('startDate')
  const [pastConferencePage, setPastConferencePage] = useState(
    urlQueryString.pastPage ? Number(urlQueryString.pastPage) : 0
  )
  const [showNewsletterBanner, toggleNewsletterBanner] = useToggle(false)
  const history = useHistory()

  // These are sets in the url, when reaching through /ux/France for instance
  // See routes definitions in App.tsx
  const { topic, country } = useParams<{
    topic: string
    country: string
  }>()

  const [searchState, setSearchState] = useState<SearchState>({
    toggle: {
      online: urlQueryString.online === 'true',
      offersSignLanguageOrCC: urlQueryString.offersSignLanguageOrCC === 'true',
    },
    refinementList: {
      continent: paramsFromUrl(urlQueryString, 'continents') || [],
      country:
        paramsFromUrl(urlQueryString, 'countries') || [country].filter(Boolean), // Removes nullish values,
      topics:
        paramsFromUrl(urlQueryString, 'topics') || [topic].filter(Boolean), // Removes nullish values,
    },
  })

  const loadPast = () => {
    setPastConferencePage((page) => page + 1)
    window.scrollTo(0, 0)
  }

  const sortByCfpEndDate = () => {
    setSortBy(sortBy === 'cfpEndDate' ? 'startDate' : 'cfpEndDate')
  }

  const updateUrlQueryParams = (algoliaSearchState: SearchState) => {
    setSearchState(algoliaSearchState)
    const online = algoliaSearchState.toggle.online
    const offersSignLanguageOrCC =
      algoliaSearchState.toggle.offersSignLanguageOrCC
    const continents = (algoliaSearchState.refinementList.continent || []).join(
      QUERY_SEPARATOR
    )
    const countries = (algoliaSearchState.refinementList.country || []).join(
      QUERY_SEPARATOR
    )
    const topics = (algoliaSearchState.refinementList.topics || []).join(
      QUERY_SEPARATOR
    )
    history.push(
      `?${qs.stringify({
        ...(pastConferencePage > 0 && { pastPage: pastConferencePage }),
        ...(online && {
          online: online,
        }),
        ...(offersSignLanguageOrCC && {
          offersSignLanguageOrCC: offersSignLanguageOrCC,
        }),
        ...(continents && { continents: continents }),
        ...(countries && { countries: countries }),
        ...(topics && { topics: topics }),
      })}`
    )
  }

  const algoliaFilter = () => {
    let filters =
      pastConferencePage > 0
        ? `startDateUnix>${dateToTime(
            subMonths(TODAY, pastConferencePage * 5)
          )} AND startDateUnix<${dateToTime(
            subMonths(TODAY, (pastConferencePage - 1) * 5)
          )}`
        : `startDateUnix>${dateToTime(TODAY)}`
    console.log(filters)
    console.log(pastConferencePage)
    if (showCFP) {
      filters += String(` AND cfpEndDateUnix>${dateToTime(TODAY)}`)
    }

    return filters
  }

  const loadMore = () => {
    setHitsPerPage(hitsPerPage + 50)
  }

  const hidePastConferences = () => {
    setPastConferencePage(0)
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
          <Link url='https://github.com/tech-conferences/confs.tech' external>
            ★ on GitHub
          </Link>
          <Link button onClick={toggleNewsletterBanner}>
            Subscribe to our Newsletter
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
          attribute='continent'
          transformItems={transformCountryRefinements}
          defaultRefinement={(
            searchState.refinementList.continent || []
          ).filter(Boolean)}
        />

        <RefinementList
          showMoreLimit={100}
          limit={9}
          showMore
          attribute='country'
          transformItems={transformCountryRefinements}
          defaultRefinement={(searchState.refinementList.country || []).filter(
            Boolean
          )}
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
        {pastConferencePage > 0 && (
          <p className={styles.LinkGroup}>
            <Link button onClick={loadPast}>
              See more conferences from the past
            </Link>
            <Link button onClick={hidePastConferences}>
              Hide past conferences
            </Link>
          </p>
        )}

        <ConferenceList
          onLoadMore={loadMore}
          sortBy={sortBy}
          showCFP={showCFP}
        />
      </InstantSearch>

      <p className={styles.LinkGroup}>
        <Link
          button
          selected={pastConferencePage > 0}
          onClick={pastConferencePage > 0 ? hidePastConferences : loadPast}
        >
          {pastConferencePage > 0
            ? 'Hide past conferences'
            : 'See past conferences'}
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
