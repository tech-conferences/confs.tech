import React, {PureComponent} from 'react';

import Link from '../Link';
import Heading from '../Heading';
import styles from './SponsoredConference.scss';

export default class SponsoredConference extends PureComponent {
  render() {
    return (
      <div className={styles.SponsoredConference}>
        <img src="sponsors/dotjs.png" className={styles.Image} />
        <div className={styles.Content}>
          <div>
            <Heading element="p" level={4}>
              <Link url="https://2018.dotjs.io/tickets?promocode=CONFSTECH" external>
                dotJS
              </Link>
            </Heading>
            <p>November 9, 2018 ・ Paris, France</p>
            <p className={styles.Footer}>
              #javascript ・ 20% off with promocode: <span className={styles.promocode}>CONFSTECH</span>
            </p>
          </div>
          <span className={styles.sponsored}>sponsored</span>
        </div>
      </div>
    );
  }
}
