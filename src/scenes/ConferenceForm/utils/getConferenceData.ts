import { format } from 'date-fns'
import { Conference } from '../types/Conference'

export const CONFERENCE_DATE_FORMAT = 'y-MM-dd'

export function getConferenceData(conference: Conference) {
  const {
    name,
    city,
    country,
    twitter,
    startDate,
    endDate,
    cfpEndDate,
  } = conference

  return JSON.stringify({
    ...conference,
    name: name ? name.trim() : name,
    city: city ? city.trim() : city,
    country: country ? country.trim() : country,
    twitter: twitter !== '@' ? twitter : null,
    startDate: startDate ? format(startDate, CONFERENCE_DATE_FORMAT) : null,
    endDate: endDate ? format(endDate, CONFERENCE_DATE_FORMAT) : null,
    cfpEndDate: cfpEndDate ? format(cfpEndDate, CONFERENCE_DATE_FORMAT) : null,
  })
}
