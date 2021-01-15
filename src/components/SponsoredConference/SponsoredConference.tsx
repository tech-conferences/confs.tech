import React, { PureComponent } from 'react'

import Link from '../Link'
import Heading from '../Heading'
import styles from './SponsoredConference.scss'

export default class SponsoredConference extends PureComponent {
  render() {
    return (
      <div className={styles.SponsoredConference}>
        <img src='./sponsors/dotcss.png' className={styles.Image} />
        <div className={styles.Content}>
          <div>
            <Heading element='p' level={4}>
              <Link
                onClick={this.trackLink}
                url='https://www.dotcss.io/'
                external
              >
                dotCSS
              </Link>
            </Heading>
            <p>November 8, 2018 ・ Paris, France</p>
            <p className={styles.Footer}>
              #css ・
              <Link
                onClick={this.trackLink}
                url='https://2018.dotcss.io/tickets?promocode=CONFSTECH'
                external
              >
                <span className={styles.Footer}>20% off with promocode: </span>
                <span className={styles.promocode}>CONFSTECH</span>
              </Link>
            </p>
          </div>
          <span className={styles.sponsored}>partner</span>
        </div>
      </div>
    )
  }

  private trackLink(event: React.MouseEvent<HTMLAnchorElement>) {
    const { href } = event.currentTarget

    ga('send', 'event', 'outbound-sponsor', 'click', href, {
      transport: 'beacon',
    })
  }
}
