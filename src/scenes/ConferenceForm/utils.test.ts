/* global describe, it, expect */

import {
  isValidBlueskyHandle,
  isValidMastodonHandle,
  isValidTwitterHandle,
  showWarningForTopics,
} from './utils'

describe('RegEx', () => {
  describe('showWarningForTopics', () => {
    it('returns true when topic is in warning list', () => {
      expect(showWarningForTopics(['leadership'])).toBeTruthy()
    })

    it('returns false when topic is not in warning list', () => {
      expect(showWarningForTopics(['javascript'])).toBeFalsy()
    })
  })

  describe('BLUESKY_REGEX', () => {
    it('returns true for good handles', () => {
      expect(isValidBlueskyHandle('standard.bsky.social')).toBeTruthy()
      expect(isValidBlueskyHandle('other.website.com')).toBeTruthy()
      expect(isValidBlueskyHandle('other.website.eu')).toBeTruthy()
      expect(isValidBlueskyHandle('')).toBeTruthy()
    })

    it('returns false for bad handles', () => {
      expect(isValidBlueskyHandle('@username')).toBeFalsy()
      expect(isValidBlueskyHandle('username')).toBeFalsy()
      expect(isValidBlueskyHandle('@.instance')).toBeFalsy()
      expect(isValidBlueskyHandle('@username.instance')).toBeFalsy()
      expect(isValidBlueskyHandle('username@instance.com')).toBeFalsy()
      expect(isValidBlueskyHandle('@username.instance@')).toBeFalsy()
    })
  })

  describe('TWITTER_REGEX', () => {
    it('returns true for good handles', () => {
      expect(isValidTwitterHandle('@goodHandle')).toBeTruthy()
      expect(isValidTwitterHandle('@good.Handle')).toBeTruthy()
      expect(isValidTwitterHandle('')).toBeTruthy()
    })

    it('returns false for bad handles', () => {
      expect(isValidTwitterHandle('@bad-Handle')).toBeFalsy()
      expect(isValidTwitterHandle('badHandle')).toBeFalsy()
      expect(isValidTwitterHandle('@.badHandle')).toBeFalsy()
    })
  })

  describe('MASTODON_REGEX', () => {
    it('returns true for good handles', () => {
      expect(isValidMastodonHandle('@username@mastodon.social')).toBeTruthy()
      expect(isValidMastodonHandle('@user123@instance.domain')).toBeTruthy()
      expect(isValidMastodonHandle('@cool_user@myinstance.com')).toBeTruthy()
      expect(isValidMastodonHandle('@john.doe@tester.org')).toBeTruthy()
      expect(isValidMastodonHandle('@Tester@social.network.eu')).toBeTruthy()
      expect(isValidMastodonHandle('')).toBeTruthy()
    })

    it('returns false for bad handles', () => {
      expect(isValidMastodonHandle('@username')).toBeFalsy()
      expect(isValidMastodonHandle('username')).toBeFalsy()
      expect(isValidMastodonHandle('@.instance')).toBeFalsy()
      expect(isValidMastodonHandle('@username.instance')).toBeFalsy()
      expect(isValidMastodonHandle('username@instance.com')).toBeFalsy()
      expect(isValidMastodonHandle('@username.instance@')).toBeFalsy()
    })
  })
})
