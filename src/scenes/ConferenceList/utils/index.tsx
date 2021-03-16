import { orderBy } from 'lodash'
import { TOPICS } from 'src/components/config'

export function transformTopicRefinements(items: any[]) {
  items.map((item) => {
    item.label = TOPICS[item.label] || item.label
    return item
  })
  return orderBy(items, ['count', 'name'], ['desc', 'desc'])
}

export function transformCountryRefinements(items: any[]) {
  return orderBy(items, ['count', 'name'], ['desc', 'desc'])
}

export function transformCurrentRefinements(items: any[]) {
  if (!items.length) {
    return []
  }

  const topics = items.find((item) => item.attribute === 'topics')
  // Change topic label
  if (topics) {
    topics.items.map((item: any) => {
      item.label = TOPICS[item.label] || item.label
      return item
    })
  }

  // Don't render 'online' and 'offersSignLanguageOrCC' refinements
  return (items || []).filter(
    (item) =>
      item.attribute !== 'online' && item.attribute !== 'offersSignLanguageOrCC'
  )
}

export function getFirstTopic(topics: string[]) {
  if (topics.length > 1 && topics[0] === 'general') {
    return topics[1]
  }

  return topics[0]
}

export function getCfpUrl(showCFP: boolean) {
  if (showCFP) {
    return `${location.pathname}`.replace('/cfp', '')
  } else {
    return `/cfp${location.pathname}`
  }
}
