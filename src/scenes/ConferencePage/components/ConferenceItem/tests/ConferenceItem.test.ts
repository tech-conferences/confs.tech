/* global describe, it, expect */

import { formatDate } from '../utils'

describe('#formatDate', () => {
  describe('with same startDate and endDate', () => {
    it('should return only with the start date', () => {
      const date = formatDate('2018-01-01', '2018-01-01')
      expect(date).toBe('January 1')
    })
  })

  describe('with different startDate and endDate', () => {
    it('should return start and end date', () => {
      const date = formatDate('2018-01-01', '2018-01-02')
      expect(date).toBe('January 1-2')
    })
  })

  describe('with dates without specific day', () => {
    it('should return only the month', () => {
      const date = formatDate('2018-01', '2018-01')
      expect(date).toBe('January')
    })
  })
})
