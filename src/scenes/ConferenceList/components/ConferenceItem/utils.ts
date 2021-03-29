import { format, getMonth, parseISO } from 'date-fns'

export function formatDate(startDate: string, endDate?: string) {
  // If specific date is not defined yet. Meaning startDate is 2018-02 for instance
  if (startDate.length === 7) {
    return format(parseISO(`${startDate}-01`), 'MMMM')
  }

  const parsedStartDate = parseISO(startDate)

  if (endDate && startDate !== endDate) {
    const parsedEndDate = parseISO(endDate)

    const startMonth = getMonth(parsedStartDate)
    const endMonth = getMonth(parsedEndDate)

    if (startMonth === endMonth) {
      return `${format(parsedStartDate, 'MMMM d')}${format(
        parsedEndDate,
        '-d'
      )}`
    } else {
      return `${format(parsedStartDate, 'MMMM d')}${format(
        parsedEndDate,
        ' - MMMM d'
      )}`
    }
  } else {
    return format(parsedStartDate, 'MMMM d')
  }
}

interface JSONLD {
  name: string
  url: string
  city: string
  country: string
  startDate: string
  endDate: string
}

export function generateEventJSONLD({
  name,
  url,
  city,
  country,
  startDate,
  endDate,
}: JSONLD) {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Event',
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressCountry: country,
      },
      name: `${city}, ${country}`,
    },
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    name,
    startDate,
    url,
    endDate: endDate || startDate,
  }

  return JSON.stringify(data)
}
