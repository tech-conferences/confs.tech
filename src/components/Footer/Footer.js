/* eslint-disable */
import React from 'react';

import {TOPICS} from '../config';
import styles from './Footer.scss';
import Link from '../Link';

export default function Footer({showCFP, togglePast, showPast}) {
  return (
    <footer className={styles.Footer}>
      <HiddenLinks />
      <p className={styles.FooterLinks}>
        <Link selected={showPast} onClick={togglePast}>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
        </Link>
        <Link url={getURL(showCFP)}>
          {showCFP
            ? 'Hide Call For Papers'
            : 'See Call For Papers'
          }
        </Link>
      </p>
      <p>
        <Link url="https://github.com/tech-conferences/confs.tech/" external>
          See on Github / contribute
        </Link>
      </p>
      <p>
        Maintained by {Twitter('katyaprigara')}, {Twitter('nimz_co')} and {Twitter('trivikram')}
      </p>
      <p>
        <img alt="Sponsor: Search by Algolia" src="./search-by-algolia.svg" height="20" />
      </p>
    </footer>
  );
}

function Twitter(handle) {
  return (
    <Link url={`https://twitter.com/@${handle}`} external>
      @{handle}
    </Link>
  );
}

function getURL(showCFP) {
  if (showCFP) {
    return `${location.pathname}`.replace('/cfp', '')
  } else {
    return `/cfp${location.pathname}`
  }
}

function HiddenLinks() {
  return (
    <div className={styles.visuallyHidden}>
      {Object.keys(TOPICS).map((topic) => {
        return (
          <p key={topic}>
            <Link routed url={`/${topic}`}>
              {topic} conferences in {new Date().getYear() + 1900}
            </Link>
          </p>
        )
      })}
    </div>
  );
}
