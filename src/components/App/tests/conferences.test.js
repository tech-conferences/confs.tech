/* global describe, it, expect, beforeAll, require */
/* eslint-disable no-console */
import {range} from 'lodash';
import {getDuplicates} from './utils';

const START_YEAR = 2017;
const CURRENT_YEAR = (new Date()).getYear() + 1900;
const LANGUAGES = ['css', 'ruby', 'android', 'ios', 'ux', 'javascript'];
const BASE_DIR = '../../../../conferences';
const conferencesJSON = {};
const JS_BASE_URL = 'https://raw.githubusercontent.com/tech-conferences/javascript-conferences/master/conferences';

range(START_YEAR, CURRENT_YEAR).forEach((year) => {
  conferencesJSON[year] = {};
  LANGUAGES.forEach((lang) => {
    if (lang === 'javascript') {
      conferencesJSON[year][lang] = `${JS_BASE_URL}/${year}/${lang}.json`;
    } else {
      conferencesJSON[year][lang] = require(`${BASE_DIR}/${year}/${lang}.json`);
    }
  });
});

const REQUIRED_KEYS = ['name', 'url', 'startDate', 'country'];
const BAD_COUNTRY_NAMES = ['USA', 'U.S.A', 'UK', 'U.K'];

Object.keys(conferencesJSON).forEach((year) => {
  Object.keys(conferencesJSON[year]).forEach((stack) => {
    describe(`${stack} conferences in ${year}`, () => {
      let conferences;

      beforeAll(async (done) => {
        conferences = await getConferences(conferencesJSON[year][stack]);
        done();
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

function getConferences(conferenceLink) {
  if (typeof conferenceLink === 'string') {
    return fetch(conferenceLink)
      .then((response) => response.json());
  } else {
    return new Promise((resolve) => {
      resolve(conferenceLink);
    });
  }
}
