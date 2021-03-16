import { parseISO, format } from 'date-fns'
import { sortBy, groupBy } from 'lodash'

export function getConfsMonthsSorted(conferences: Conference[]) {
  return sortBy(Object.keys(conferences), (conference) => {
    return parseInt(conference.replace('-', ''), 10)
  })
}

export function getMonthName(month: string) {
  return format(parseISO(`2017-${month}-01`), 'MMMM')
}

export function groupAndSortConferences(
  conferences: Conference[],
  sortByKey = 'startDate'
) {
  // Group conferences by year
  // FIXME: remove any
  const confs: any = groupBy<Conference>(conferences, (conf) =>
    format(parseISO(conf[sortByKey]), 'yyyy')
  )

  // Group conferences by month within the year
  Object.keys(confs).map((year: string) => {
    confs[year] = groupBy(confs[year], (conf) =>
      format(parseISO(conf[sortByKey]), 'yyyy-MM')
    )
    Object.keys(confs[year]).map((month) => {
      confs[year][month] = sortBy(
        confs[year][month],
        (conference) => conference[sortByKey]
      )
    })
  })

  return confs
}
