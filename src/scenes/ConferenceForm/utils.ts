export const LOCATION_ONLINE_REGEX =
  /online|remote|everywhere|world|web|global|virtual|www|http/i
export const VALID_URL_REGEX = /^http(s?):\/\//
export const URL_PARAMETER_REGEX = /\?/
export const URL_SHORTENER_REGEX = /(\/bitly)|(\/bit\.ly)|(\/t\.co)/i
export const TWITTER_REGEX = /@\w([\w\.]){1,15}$/
export const UNWANTED_CONFERENCE_NAME_REGEX =
  /webinar|marketing|practical guide|meeting|trends|digimarcon|hackathon|101|estate|expo|techspo|outsourcing|physical|biology|neuroscience|healthcare|nutrition|Food Science/i
export const UNWANTED_CONFERENCE_URL_REGEX =
  /webinar|marketing|hackathon|digimarcon/i

export const isValidTwitterHandle = (twitterHandle: string) => {
  if (twitterHandle.length <= 1) {
    return false
  }

  return TWITTER_REGEX.test(twitterHandle)
}
