import React from 'react';

import styles from './Footer.scss';
import Link from '../Link';

export default function Footer({addConferenceUrl, togglePast, showPast}) {
  return (
    <footer className={styles.Footer}>
      <p className={styles.FooterLinks}>
        <Link url={addConferenceUrl} external>
          Add a conference
        </Link>
        <Link onClick={togglePast}>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
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
