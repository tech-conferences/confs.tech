import React from 'react';

import styles from './Footer.scss';
import Link from '../Link';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <p>
        <Link url="https://github.com/nimzco/confs.tech/issues/new" external>
          Add a conference
        </Link>
      </p>
      <p>
        Maintained by&nbsp;
        <Link url="https://twitter.com/nimz_co" external>
          @nimzco
        </Link>
      </p>
    </footer>
  );
}
