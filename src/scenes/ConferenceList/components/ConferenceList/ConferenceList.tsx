import { isPast, parseISO } from 'date-fns'
import { filter } from 'lodash'
import React from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import { Divider, Heading, Link } from 'src/components'
import { Conference } from 'types/conference'
import { SortBy, SortDirection } from 'types/global'

import { ConferenceItem } from '..'

import styles from './ConferenceList.module.scss'
import {
  getConfsMonthsSorted,
  groupAndSortConferences,
  getMonthName,
} from './utils'

interface Props {
  showCFP: boolean
  sortBy: SortBy
  sortDirection: SortDirection
  hasMore?: boolean
  hits: Conference[]
  onLoadMore(): void
}

const ConferenceList: React.FC<Props> = ({
  hits,
  showCFP,
  sortBy,
  sortDirection,
  hasMore,
  onLoadMore,
}) => {
  let filteredConferences = hits as Conference[]

  if (showCFP) {
    filteredConferences = filter(hits, (conf) => {
      return conf.cfpEndDate && !isPast(parseISO(conf.cfpEndDate))
    }) as Conference[]
  }
  const confs = groupAndSortConferences(
    filteredConferences,
    sortBy,
    sortDirection
  )

  const conferenceYears =
    sortDirection === 'desc' ? Object.keys(confs).reverse() : Object.keys(confs)
  return (
    <section className={styles.Wrapper}>
      {hits.length === 0 && (
        <div className={styles.NoResults}>No results found.</div>
      )}

      {conferenceYears.map((year, index) => {
        return (
          <React.Fragment key={year}>
            {index > 0 && <Divider />}
            <Year year={year} />
            <div className={styles.ConferenceList}>
              {getConfsMonthsSorted(confs[year], sortDirection).map(
                (monthKey: string) => {
                  const month = monthKey.split('-')[1]
                  return (
                    <React.Fragment key={month}>
                      <Heading element='h2' level={3}>
                        {getMonthName(month)}
                      </Heading>
                      <ul>
                        {confs[year][monthKey].map((conf: Conference) => {
                          return (
                            <ConferenceItem
                              {...conf}
                              key={conf.objectID}
                              showCFP={showCFP}
                            />
                          )
                        })}
                      </ul>
                    </React.Fragment>
                  )
                }
              )}
            </div>
          </React.Fragment>
        )
      })}

      {hasMore && (
        <Link button onClick={onLoadMore}>
          Load more
        </Link>
      )}
    </section>
  )
}

function Year({ year }: { year: string }) {
  return (
    <div className={styles.Year}>
      <div>
        <Heading key={year} element='h2' level={2}>
          {year}
        </Heading>
      </div>
      <div className={styles.AddConference}>
        <AddConferenceLink />
      </div>
    </div>
  )
}

function AddConferenceLink() {
  return (
    <div className={styles.AddConfPanelWrapper}>
      <Link url='/conferences/new' routed>
        Add a conference
      </Link>
    </div>
  )
}

export default connectInfiniteHits(ConferenceList)
