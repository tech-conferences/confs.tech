// Reorder a file by running (from the scripts folder)
// node ./reorder-by-data {name-of-file-withouth.json} {year (optional)}

// Requires
const fs = require("fs");
import {range} from 'lodash';
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
     data = JSON.parse(data);
     data.sort((a,b) => {
       let startA = parse(a.startDate).getTime();
       let startB = parse(b.startDate).getTime();
       if (startA > startB) {
        return 1;
      }
       if (startA < startB) {
        return -1;
      }
       return 0;
     });

     fs.writeFile(fileName, JSON.stringify(data, null, 2), () => {
       console.log(`File ${fileName} was successfully reordered`);
     });
    });
  });
});
