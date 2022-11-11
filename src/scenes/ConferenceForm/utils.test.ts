/* global describe, it, expect */

import { isValidTwitterHandle, showWarningForTopics } from './utils'

describe('RegEx', () => {
  describe('showWarningForTopics', () => {
    it('returns true when topic is in warning list', () => {
      expect(showWarningForTopics(['leadership'])).toBeTruthy()
    })

    it('returns false when topic is not in warning list', () => {
      expect(showWarningForTopics(['javascript'])).toBeFalsy()
    })
  })
  describe('TWITTER_REGEX', () => {
    it('returns true for good handles', () => {
      expect(isValidTwitterHandle('@goodHandle')).toBeTruthy()
      expect(isValidTwitterHandle('@good.Handle')).toBeTruthy()
      expect(isValidTwitterHandle('')).toBeTruthy()
    })

    it('returns false for good handles', () => {
      expect(isValidTwitterHandle('@bad-Handle')).toBeFalsy()
      expect(isValidTwitterHandle('badHandle')).toBeFalsy()
      expect(isValidTwitterHandle('@.badHandle')).toBeFalsy()
    })
  })
})
