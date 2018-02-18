import React from 'react';

import styles from './Footer.scss';
import Link from '../Link';

export default function Footer({showCFP, filters, addConferenceUrl, showPast}) {
  return (
    <footer className={styles.Footer}>
      <p className={styles.FooterLinks}>
        <Link url={addConferenceUrl} external>
          Add a conference
        </Link>
        <Link routed url={addConferenceUrl} external>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
        </Link>
        <Link selected={showCFP} url={showCFP ? `/${filters.type}` : `/cfp/${filters.type}`}>
          See Call For Papers
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
