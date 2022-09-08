import { isBefore, isAfter, parseISO } from 'date-fns'

import { SponsoredConf } from './SponsoredConference'
import SPONSORS from './sponsors.json'

export const sponsorConferenceForDate = (date: Date) => {
  return (SPONSORS as SponsoredConf[]).find((conf) => {
    return (
      isBefore(date, parseISO(conf.sponsorDateEnd)) &&
      isAfter(date, parseISO(conf.sponsorDateStart))
    )
  })
}
