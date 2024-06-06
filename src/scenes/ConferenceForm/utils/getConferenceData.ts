import { format } from 'date-fns'

import { Conference } from '../types/Conference'

export const CONFERENCE_DATE_FORMAT = 'y-MM-dd'
const DEFAULT_CONFERENCE_LOCALE = 'EN'

export function getConferenceData(conference: Conference) {
  const {
    name,
    startDate,
    endDate,
    city,
    country,
    locales,
    cfpEndDate,
    twitter,
    github,
    mastodon,
  } = conference

  return JSON.stringify({
    ...conference,
    name: name ? name.trim() : name,
    startDate: startDate ? format(startDate, CONFERENCE_DATE_FORMAT) : null,
    endDate: endDate ? format(endDate, CONFERENCE_DATE_FORMAT) : null,
    city: city ? city.trim() : city,
    country: country ? country.trim() : country,
    locales: locales ? locales.join(',') : DEFAULT_CONFERENCE_LOCALE,
    cfpEndDate: cfpEndDate ? format(cfpEndDate, CONFERENCE_DATE_FORMAT) : null,
    twitter: twitter !== '@' ? twitter : null,
    github: github !== '' ? github : null,
    mastodon: mastodon !== '' ? mastodon : null,
  })
}
