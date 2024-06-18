import algoliasearch from 'algoliasearch/lite'
import { subMonths } from 'date-fns'
import qs from 'qs'
import React, { useMemo, useState } from 'react'
import {
  Configure,
  InstantSearch,
  ToggleRefinement,
  RefinementList,
  CurrentRefinements,
  connectStats,
} from 'react-instantsearch-dom'
import { useNavigate, useParams } from 'react-router'
import {
  Divider,
  Heading,
  Search,
  Page,
  Link,
  ScrollToConference,
  SponsoredConference,
} from 'src/components'
import { TOPICS } from 'src/components/config'
import { SortBy, SortDirection } from 'types/global'

import './RefinementList.module.scss'
import './CurrentRefinement.module.scss'

import styles from './ConferenceList.module.scss'
import {
  ConferenceList,
  CFPHeader,
  OpenCollectiveContribution,
} from './components'
import {
  transformTopicRefinements,
  transformCountryRefinements,
  transformCurrentRefinements,
  paramsFromUrl,
  dateToTime,
  QUERY_SEPARATOR,
} from './utils'

const CURRENT_YEAR = new Date().getFullYear()
const TODAY = new Date()

interface Props {
  showCFP?: boolean
  showPast?: boolean
}

interface SearchState {
  toggle: {
    offersSignLanguageOrCC: boolean
  }
  refinementList: {
    continent?: string[]
    country?: string[]
    topics: string[]
  }
}

interface Params {
  topic: string
  country: string
}

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID as string,
  process.env.REACT_APP_ALGOLIA_API_KEY as string,
)

type OnlineOptions = 'hybrid' | 'online' | 'inPerson'

const ConferenceListPage: React.FC<Props> = ({
  showCFP = false,
  showPast = false,
}) => {
  const urlQueryString = qs.parse(window.location.search.replace('?', ''))
  // These are sets in the url, when reaching through /ux/France for instance
  // See routes definitions in App.tsx
  const { topic, country } = useParams()

  const [hitsPerPage, setHitsPerPage] = useState(600)
  const [sortBy, setSortBy] = useState<SortBy>('startDate')
  const [online, setOnline] = useState<OnlineOptions>('hybrid')

  const [sortDirection] = useState<SortDirection>(showPast ? 'desc' : 'asc')
  const [pastConferencePage, setPastConferencePage] = useState(
    urlQueryString.page ? Number(urlQueryString.page) : 1,
  )

  const navigate = useNavigate()

  const [searchState, setSearchState] = useState<SearchState>({
    toggle: {
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

  const sortByCfpEndDate = () => {
    setSortBy(sortBy === 'cfpEndDate' ? 'startDate' : 'cfpEndDate')
  }

  const updateUrlQueryParams = (algoliaSearchState: SearchState) => {
    setSearchState(algoliaSearchState)
    const offersSignLanguageOrCC =
      algoliaSearchState.toggle.offersSignLanguageOrCC
    const continents = (algoliaSearchState.refinementList.continent || []).join(
      QUERY_SEPARATOR,
    )
    const countries = (algoliaSearchState.refinementList.country || []).join(
      QUERY_SEPARATOR,
    )
    const topics = (algoliaSearchState.refinementList.topics || []).join(
      QUERY_SEPARATOR,
    )
    navigate(
      `?${qs.stringify({
        ...(online && {
          online: online,
        }),
        ...(offersSignLanguageOrCC && {
          offersSignLanguageOrCC: offersSignLanguageOrCC,
        }),
        ...(continents && { continents: continents }),
        ...(countries && { countries: countries }),
        ...(topics && { topics: topics }),
      })}`,
    )
  }

  const algoliaFilter = useMemo(() => {
    let filters = showPast
      ? `startDateUnix>${dateToTime(
          subMonths(TODAY, pastConferencePage * 5),
        )} AND startDateUnix<${dateToTime(
          subMonths(TODAY, (pastConferencePage - 1) * 5),
        )}`
      : `startDateUnix>${dateToTime(TODAY)}`

    if (showCFP) {
      filters += String(` AND cfpEndDateUnix>${dateToTime(TODAY)}`)
    }

    if (online === 'inPerson' || online === 'online') {
      filters += String(` AND online=${online === 'online' ? 1 : 0}`)
    }

    return filters
  }, [showPast, online, pastConferencePage])

  const loadMore = () => {
    setHitsPerPage(hitsPerPage + 50)
  }

  return (
    <Page
      noPadding
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
      <OpenCollectiveContribution />
      <InstantSearch
        searchClient={searchClient}
        onSearchStateChange={updateUrlQueryParams}
        searchState={searchState}
        indexName='prod_conferences'
      >
        <Configure hitsPerPage={hitsPerPage} filters={algoliaFilter} />
        <div className={styles.RefinementsWrapper}>
          <p className={styles.HeaderLinks}>
            {(showPast || showCFP) && <Link url='/'>Upcoming conferences</Link>}
            {!showCFP && <Link url='/cfp'>Call for Papers</Link>}
            {!showPast && <Link url='/past'>Past conferences</Link>}
            <Link url='/pages/sponsorships' routed>
              Sponsor
            </Link>
            <Link url='/conferences/new' routed>
              Add a conference
            </Link>
          </p>
          <Search />
          <RefinementList
            limit={40}
            attribute='topics'
            defaultRefinement={(searchState.refinementList.topics || []).filter(
              Boolean,
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
            defaultRefinement={(
              searchState.refinementList.country || []
            ).filter(Boolean)}
          />
          <div>
            <OnlineRefinement value={online} onChange={setOnline} />
            <ToggleRefinement
              attribute='offersSignLanguageOrCC'
              label='Offers interpretation to International sign language or closed captions'
              value={true}
              defaultRefinement={searchState.toggle.offersSignLanguageOrCC}
            />
          </div>

          <SponsoredConference />

          <Divider />

          <div className={styles.CurrentRefinements}>
            <CurrentRefinements transformItems={transformCurrentRefinements} />
            <ShowingResulstsCount />
          </div>

          <ScrollToConference hash={location.hash} />
        </div>
        {showCFP && (
          <CFPHeader sortByCfpEndDate={sortByCfpEndDate} sortBy={sortBy} />
        )}
        {showPast && (
          <>
            <Heading element='h2' level={2}>
              Past conferences
            </Heading>
          </>
        )}

        <ConferenceList
          onLoadMore={loadMore}
          sortBy={sortBy}
          sortDirection={sortDirection}
          showCFP={showCFP}
        />
      </InstantSearch>

      {showPast && (
        <p>
          <Link
            button
            onClick={() => setPastConferencePage((page) => page + 1)}
          >
            Load more
          </Link>
        </p>
      )}
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

interface OnlineRefinementProps {
  value: OnlineOptions
  onChange(arg: OnlineOptions): void
}
const OnlineRefinement = ({ value, onChange }: OnlineRefinementProps) => {
  return (
    <div className={styles.OnlineRadios}>
      <label>
        <input
          name='online'
          checked={value === 'hybrid'}
          value='hybrid'
          type='radio'
          onChange={(e) => {
            onChange(e.target.value as OnlineOptions)
          }}
        />
        <span>In person & Online</span>
      </label>
      <label>
        <input
          name='online'
          checked={value === 'online'}
          value='online'
          type='radio'
          onChange={(e) => {
            onChange(e.target.value as OnlineOptions)
          }}
        />
        <span>Online</span>
      </label>
      <label>
        <input
          name='online'
          checked={value === 'inPerson'}
          value='inPerson'
          type='radio'
          onChange={(e) => {
            onChange(e.target.value as OnlineOptions)
          }}
        />
        <span>In person</span>
      </label>
    </div>
  )
}
