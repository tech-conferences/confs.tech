import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConference.module.scss'

const SponsoredConference = () => {
  return (
    <div className={styles.SponsoredConference}>
      <img alt='' src={`sponsors/devternity.jpg`} className={styles.Image} />
      <div className={styles.Content}>
        <div>
          <Heading element='p' level={4}>
            <Link url='https://devternity.com' external>
              DevTernity
            </Link>
          </Heading>
          <p>December 8, 2022 ・ Online</p>
          <p className={styles.Footer}>
            Turning developers into architects and engineering leaders
          </p>
        </div>
        <span className={styles.sponsored}>sponsored</span>
      </div>
    </div>
  )
}

export default SponsoredConference
