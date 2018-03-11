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
const DATES_KEYS = ['startDate', 'endDate', 'cfpEndDate'];
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

      it('url does not finishes with a slash', () => {
        conferences.forEach((conference) => {
          if ((conference.url).endsWith('/')) {
            console.error(`${conference.url} finishes with a slash`);
          }
          expect((conference.url).endsWith('/')).toBe(false);

          if ((conference.cfpUrl || '').endsWith('/')) {
            console.error(`${conference.cfpUrl} finishes with a slash`);
          }
          expect((conference.cfpUrl || '').endsWith('/')).toBe(false);
        });
      });

      it('is not missing mandatory key', () => {
        conferences.forEach((conference) => {
          REQUIRED_KEYS.forEach((requiredKey) => {
            expect(conference.hasOwnProperty(requiredKey)).toBe(true);
          });
        });
      });

      it('dates are correctly formatted', () => {
        conferences.forEach((conference) => {
          DATES_KEYS.forEach((dateKey) => {
            // cfpEndDate could be undefined or null
            if (!conference[dateKey]) { return; }
            if ([7, 10].indexOf(conference[dateKey].length) === -1) {
              console.error(`${conference.name} has malformatted ${dateKey}: ${conference[dateKey]}`);
            }
            expect([7, 10]).toContain(conference[dateKey].length);
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
