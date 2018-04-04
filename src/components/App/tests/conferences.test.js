/* global describe, it, expect, require */
/* eslint-disable no-console, shopify/prefer-early-return */
import {range} from 'lodash';
import {getDuplicates} from './utils';
import {TOPICS} from '../../config';

const BASE_DIR = '../../../../conferences';
const START_YEAR = 2017;
const CURRENT_YEAR = (new Date()).getYear() + 1900;
const conferencesJSON = {};

// Remove JavaScript key
const LANGUAGES = Object.keys(TOPICS);
LANGUAGES.splice(LANGUAGES.indexOf('javascript'), 1);
range(START_YEAR, CURRENT_YEAR + 1).forEach((year) => {
  conferencesJSON[year] = {};
  LANGUAGES.forEach((lang) => {
    try {
      conferencesJSON[year][lang] = require(`${BASE_DIR}/${year}/${lang}.json`);
    // In case some years have no files
    // eslint-disable-next-line no-empty
    } catch (exception) {}
  });
});

const REQUIRED_KEYS = ['name', 'url', 'startDate', 'country'];
const DATES_KEYS = ['startDate', 'endDate', 'cfpEndDate'];
const BAD_COUNTRY_NAMES = ['US', 'U.S.', 'U.S', 'USA', 'U.S.A', 'UK', 'U.K', 'UAE'];

Object.keys(conferencesJSON).forEach((year) => {
  Object.keys(conferencesJSON[year]).forEach((stack) => {
    describe(`${stack} conferences in ${year}`, () => {
      const conferences = conferencesJSON[year][stack];

      it('does not have duplicates', () => {
        const duplicates = getDuplicates(conferences);

        if (duplicates.length > 0) {
          const dupConfs = duplicates.map((conf) => conf.name).join(', ');
          console.error(`Duplicates for ${year}/${stack}: ${dupConfs}`);
        }

        expect(duplicates.length).toBe(0);
      });

      conferences.forEach((conference) => {
        const {name, country, url, cfpUrl} = conference;

        describe(name, () => {
          describe('URLs', () => {
            const httpRegex = new RegExp('^http(s?)://');
            it('url starts with http(s)://', () => {
              if (httpRegex.exec(url) === null) {
                console.error(`${url} does not start with http`);
              }
              expect(httpRegex.exec(url)).not.toBe(null);
            });

            it('cfpUrl starts with http(s)://', () => {
              if (cfpUrl) {
                if (httpRegex.exec(cfpUrl) === null) {
                  console.error(`${cfpUrl} does not start with http`);
                }
                expect(httpRegex.exec(cfpUrl)).not.toBe(null);
              }
            });
          });

          it('is not missing mandatory key', () => {
            REQUIRED_KEYS.forEach((requiredKey) => {
              expect(conference.hasOwnProperty(requiredKey)).toBe(true);
            });
          });

          it('dates are correctly formatted', () => {
            DATES_KEYS.forEach((dateKey) => {
              // cfpEndDate could be undefined or null
              if (conference[dateKey]) {
                if ([7, 10].indexOf(conference[dateKey].length) === -1) {
                  console.error(`${name} has malformatted ${dateKey}: ${conference[dateKey]}`);
                }
                expect([7, 10]).toContain(conference[dateKey].length);
              }
            });
          });

          describe('country names', () => {
            it('has a good country name', () => {
              if (BAD_COUNTRY_NAMES.indexOf(country) !== -1) {
                console.error(`Bad country name for: ${year}/${stack}: ${name} - ${country}`);
                expect(false).toBe(true);
              }
              expect(true).toBe(true);
            });
          });
        });
      });
    });
  });
});
