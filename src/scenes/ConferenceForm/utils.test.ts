/* global describe, it, expect */

import { isValidTwitterHandle } from './utils'

describe('RegEx', () => {
  describe('TWITTER_REGEX', () => {
    it('returns true for good handles', () => {
      expect(isValidTwitterHandle('@goodHandle')).toBeTruthy()
      expect(isValidTwitterHandle('@good.Handle')).toBeTruthy()
    })

    it('returns false for good handles', () => {
      expect(isValidTwitterHandle('@bad-Handle')).toBeFalsy()
      expect(isValidTwitterHandle('badHandle')).toBeFalsy()
      expect(isValidTwitterHandle('@.badHandle')).toBeFalsy()
    })
  })
})
