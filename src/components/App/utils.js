/* eslint-disable no-unused-vars */

import React from 'react';
import {compareAsc, compareDesc} from 'date-fns';

function getDuplicates(conferences) {
  const confURLs = conferences.map((conf) => conf.url);
  const duplicates = [];

  Object.keys(conferences).forEach((key, index) => {
    const url = conferences[key].url;
    if (confURLs.indexOf(url, index + 1) !== -1) {
      if (duplicates.indexOf(url) === -1) {
        duplicates.push(conferences[key]);
      }
    }
  });
  return duplicates;
}

function showDuplicates(conferences) {
  return (
    <ul>
      <li>
        <strong>DUPLICATES</strong>
      </li>
      {getDuplicates(conferences).map((conf) => {
        return (
          <li key={`${conf.url} ${conf.name}`}>
            {conf.name}: {conf.url}
          </li>
        );
      })}
    </ul>
  );
}
