import { parseISO, isWithinInterval, isFuture, isToday } from 'date-fns'
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
  startDate: Date | null
  endDate: Date | null
}

const ConferenceList: React.FC<Props> = ({
  hits,
  showCFP,
  sortBy,
  sortDirection,
  hasMore,
  onLoadMore,
  startDate,
  endDate,
}) => {
  let filteredConferences = hits as Conference[]

  if (showCFP) {
    filteredConferences = filter(hits, (conf) => {
      if (!conf.cfpEndDate) return false
      const cfpEndDate = parseISO(conf.cfpEndDate)
      return isToday(cfpEndDate) || isFuture(cfpEndDate)
    }) as Conference[]
  }
  // Filter by date range - start filtering as soon as start date is selected
  if (startDate) {
    filteredConferences = filteredConferences.filter((conf) => {
      const conferenceStartDate = parseISO(conf.startDate)
      const conferenceEndDate = parseISO(conf.endDate)

      if (endDate) {
        // Both start and end dates are set - check if conference overlaps with the range
        return (
          isWithinInterval(conferenceStartDate, {
            start: startDate,
            end: endDate,
          }) ||
          isWithinInterval(conferenceEndDate, {
            start: startDate,
            end: endDate,
          }) ||
          (conferenceStartDate <= startDate && conferenceEndDate >= endDate)
        )
      } else {
        // Only start date is set - show conferences that start on or after this date
        return conferenceStartDate >= startDate
      }
    })
  }

  const confs = groupAndSortConferences(
    filteredConferences,
    sortBy,
    sortDirection,
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
                },
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
