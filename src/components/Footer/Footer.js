import React from 'react';

import styles from './Footer.scss';
import Link from '../Link';

export default function Footer({addConferenceUrl}) {
  return (
    <footer className={styles.Footer}>
      <p>
        <Link url={addConferenceUrl} external>
          Add a conference
        </Link>
      </p>
      <p>
        Maintained by {Twitter('katyaprigara')} and {Twitter('nimzco')}
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
