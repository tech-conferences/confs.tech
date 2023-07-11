export const LOCATION_ONLINE_REGEX =
  /online|remote|everywhere|world|web|global|virtual|www|http/i
export const VALID_URL_REGEX = /^http(s?):\/\//
export const URL_PARAMETER_REGEX = /\?/
export const URL_SHORTENER_REGEX = /(\/bitly)|(\/bit\.ly)|(\/t\.co)/i
export const TWITTER_REGEX = /@\w([\w\.]){1,15}$/
export const MASTODON_REGEX = /^@[a-zA-Z0-9._]+\@[a-zA-Z0-9.-]+$/
export const UNWANTED_CONFERENCE_NAME_REGEX =
  /webinar|marketing|practical guide|meeting|trends|digimarcon|hackathon|101|estate|expo|techspo|outsourcing|physical|biology|neuroscience|health|nutrition|Food Science|Nanoscience|nursing|Sustainability|training|Agriculture|cancer|dentistry|banking/i
export const UNWANTED_CONFERENCE_URL_REGEX =
  /webinar|marketing|hackathon|digimarcon|insightconferences|conferenceseries|inovineconferences|annualcongress/i

export const isValidTwitterHandle = (twitterHandle: string) => {
  // Allow empty handle
  if (twitterHandle.length === 0) {
    return true
  }

  if (twitterHandle.length === 1) {
    return false
  }

  return TWITTER_REGEX.test(twitterHandle)
}

export const isValidMastodonHandle = (mastodonHandle: string) => {
  // Allow empty handle
  if (mastodonHandle.length === 0) {
    return true
  }

  if (mastodonHandle.length === 1) {
    return false
  }

  return MASTODON_REGEX.test(mastodonHandle)
}

const TOPICS_WITH_WARNING = [
  'leadership',
  'networking',
  'general',
  'iot',
  'data',
]

export const showWarningForTopics = (topics: string[]) => {
  return topics.find((topic) => TOPICS_WITH_WARNING.includes(topic))
}
