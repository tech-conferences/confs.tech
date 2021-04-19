import { orderBy, reject } from 'lodash'
import { TOPICS } from 'src/components/config'
export const QUERY_SEPARATOR = '+'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformTopicRefinements(items: any[]) {
  items.map((item) => {
    item.label = TOPICS[item.label] || item.label
    return item
  })

  return orderBy(
    reject(items, (item) => item.label === ''),
    ['count', 'name'],
    ['desc', 'desc']
  )
}

interface Item {
  attribute: string
  items: { [key: string]: string }[]
}

export function transformCountryRefinements(items: Item[]) {
  return orderBy(items, ['count', 'name'], ['desc', 'desc'])
}

export function transformCurrentRefinements(items: Item[]) {
  if (!items.length) {
    return []
  }

  const topics = items.find((item) => item.attribute === 'topics')
  // Change topic label
  if (topics) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    topics.items.map((item: any) => {
      item.label = TOPICS[item.label] || item.label
      return item
    })
  }

  return (items || []).filter(
    (item) =>
      // Don't render 'online' refinements
      item.attribute !== 'online' &&
      // Don't render 'offersSignLanguageOrCC refinements
      item.attribute !== 'offersSignLanguageOrCC' //&&
  )
}

export function getFirstTopic(topics: string[]) {
  if (topics.length > 1 && topics[0] === 'general') {
    return topics[1]
  }

  return topics[0]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paramsFromUrl(urlQueryString: any, paramKey: string) {
  if (!urlQueryString[paramKey]) {
    return null
  }

  return urlQueryString[paramKey]?.split(QUERY_SEPARATOR)
}

export const dateToTime = (date: Date) => Math.round(date.getTime() / 1000)
