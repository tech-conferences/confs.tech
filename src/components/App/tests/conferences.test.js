/* global describe, it, expect, beforeAll, require */
/* eslint-disable no-console */
import {range} from 'lodash';
import {getDuplicates} from './utils';

const START_YEAR = 2017;
const CURRENT_YEAR = (new Date()).getYear() + 1900;
const LANGUAGES = ['css', 'php', 'ruby', 'android', 'ios', 'ux', 'tech-comm', 'data', 'general'];
const BASE_DIR = '../../../../conferences';
const conferencesJSON = {};

range(START_YEAR, CURRENT_YEAR).forEach((year) => {
  conferencesJSON[year] = {};
  LANGUAGES.forEach((lang) => {
    conferencesJSON[year][lang] = require(`${BASE_DIR}/${year}/${lang}.json`);
  });
});

const REQUIRED_KEYS = ['name', 'url', 'startDate', 'country'];
const BAD_COUNTRY_NAMES = ['USA', 'U.S.A', 'UK', 'U.K', 'UAE'];

Object.keys(conferencesJSON).forEach((year) => {
  Object.keys(conferencesJSON[year]).forEach((stack) => {
    describe(`${stack} conferences in ${year}`, () => {
      let conferences;

      beforeAll(() => {
        conferences = conferencesJSON[year][stack];
      });

      it('does not have duplicates', () => {
        const duplicates = getDuplicates(conferences);

        if (duplicates.length > 0) {
          const dupConfs = duplicates.map((conf) => conf.name).join(', ');
          console.error(`Duplicates for ${year}/${stack}: ${dupConfs}`);
        }

        expect(duplicates.length).toBe(0);
      });

      it('is not missing mandatory key', () => {
        conferences.forEach((conference) => {
          REQUIRED_KEYS.forEach((requiredKey) => {
            expect(conference.hasOwnProperty(requiredKey)).toBe(true);
          });
        });
      });

      describe('country names', () => {
        it('is has a good country name', () => {
          conferences.forEach((conference) => {
            if (BAD_COUNTRY_NAMES.indexOf(conference.country) !== -1) {
              console.error(`Bad country name for: ${year}/${stack}: ${conference.name} - ${conference.country}`);
              expect(false).toBe(true);
            }
            expect(true).toBe(true);
          });
        });
      });
    });
  });
});
