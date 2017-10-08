/* global describe, it, expect, beforeAll */
/* eslint-disable no-console */

import {getDuplicates} from './utils';
import ruby2017 from '../../../../conferences/2017/ruby.json';
import ux2017 from '../../../../conferences/2017/ux.json';
import android2017 from '../../../../conferences/2017/android.json';
import ios2017 from '../../../../conferences/2017/ios.json';
import ruby2018 from '../../../../conferences/2018/ruby.json';
import ux2018 from '../../../../conferences/2018/ux.json';
import android2018 from '../../../../conferences/2018/android.json';
import ios2018 from '../../../../conferences/2018/ios.json';

const JS_BASE_URL = 'https://raw.githubusercontent.com/tech-conferences/javascript-conferences/master/conferences';
const js2017 = `${JS_BASE_URL}/2017/javascript.json`;
const js2018 = `${JS_BASE_URL}/2018/javascript.json`;

const REQUIRED_KEYS = ['name', 'url', 'startDate', 'country'];
const conferencesJSON = {
  2017: {
    javascript: js2017,
    ruby: ruby2017,
    ux: ux2017,
    android: android2017,
    ios: ios2017,
  },
  2018: {
    javascript: js2018,
    ruby: ruby2018,
    ux: ux2018,
    android: android2018,
    ios: ios2018,
  },
};

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
          console.log(`Duplicates for ${stack} - ${year}: ${dupConfs}`);
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
