import { parseISO, format } from 'date-fns'
import { sortBy, groupBy } from 'lodash'
import { Conference } from 'types/conference'
import { SortBy, SortDirection } from 'types/global'

export function getConfsMonthsSorted(
  conferences: Conference[],
  sortDirection: SortDirection
) {
  return sortBy(Object.keys(conferences), (conferenceDate) => {
    const monthNumber = parseInt(conferenceDate.split('-')[1], 10)
    return sortDirection === 'asc' ? monthNumber : -monthNumber
  })
}

export function getMonthName(month: string) {
  return format(parseISO(`2017-${month}-01`), 'MMMM')
}

export function groupAndSortConferences(
  conferences: Conference[],
  sortByKey: SortBy,
  sortDirection: SortDirection
) {
  // Group conferences by year
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confs: any = groupBy<Conference>(conferences, (conf) =>
    format(parseISO(conf[sortByKey]), 'yyyy')
  )

  // Group conferences by month within the year
  Object.keys(confs).map((year: string) => {
    confs[year] = groupBy(confs[year], (conf) =>
      format(parseISO(conf[sortByKey]), 'yyyy-MM')
    )

    Object.keys(confs[year]).map((month) => {
      confs[year][month] = sortBy(confs[year][month], (conference) => {
        const conferenceDate = new Date(conference[sortByKey]).getTime()
        return sortDirection === 'asc' ? conferenceDate : -conferenceDate
      })
    })
  })

  return confs
}
