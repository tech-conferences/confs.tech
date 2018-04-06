// Reorder a file by running (from the scripts folder)

import fs from 'fs';
import {range, sortBy} from 'lodash';
import {parse} from 'date-fns';
import {TOPICS} from '../src/components/config/index';

const args = process.argv;

const START_YEAR = 2017;
const CURRENT_YEAR = (new Date()).getYear() + 1900;
const conferencesJSON = {};

// Remove JavaScript key
const LANGUAGES = Object.keys(TOPICS);
LANGUAGES.splice(LANGUAGES.indexOf('javascript'), 1);
range(START_YEAR, CURRENT_YEAR + 1).forEach((year) => {
  conferencesJSON[year] = {};
  LANGUAGES.forEach((lang) => {
    conferencesJSON[year][lang] = {};
  });
});

Object.keys(conferencesJSON).forEach((year) => {
  Object.keys(conferencesJSON[year]).forEach((topic) => {
    const fileName = `./conferences/${year}/${topic}.json`;

    fs.readFile(fileName, (err, data) => {
      if (!data) { return; }

      const sortedConfs = sortBy(JSON.parse(data),[
        (conf) => parse(conf.startDate).getTime(),
        (conf) => parse(conf.endDate || conf.startDate).getTime(),
        'name'
      ]);

      fs.writeFile(fileName, JSON.stringify(sortedConfs, null, 2), () => {
        console.log(`File ${fileName} was successfully reordered`);
      });
    });
  });
});
