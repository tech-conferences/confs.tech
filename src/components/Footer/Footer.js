/* eslint-disable */
import React from 'react';

import styles from './Footer.scss';
import Link from '../Link';

export default function Footer({showCFP, addConferenceUrl, togglePast, showPast}) {
  return (
    <footer className={styles.Footer}>
      <p className={styles.FooterLinks}>
        <Link url={addConferenceUrl} external>
          Add a conference
        </Link>
        <Link selected={showPast} onClick={togglePast}>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
        </Link>
        {/*<Link url={getURL(filters, showCFP)}>
          {showCFP
            ? 'Hide Call For Papers'
            : 'See Call For Papers'
          }
        </Link>*/}
      </p>
      <p>
        <Link url="https://github.com/tech-conferences/confs.tech/" external>
          See on Github / contribute
        </Link>
      </p>
      <p>
        Maintained by {Twitter('katyaprigara')}, {Twitter('nimz_co')} and {Twitter('trivikram')}
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

function getURL(filters, showCFP) {
  let url = '';
  if (filters.country) {
    url = `${filters.type}/${filters.country}`;
  } else {
    url = `${filters.type}`;
  }
  return `${showCFP ? '' : '/cfp'}/${url}`;
}
