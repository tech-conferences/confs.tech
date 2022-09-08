import { trackLink } from 'src/utilities/tracking'

import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConference.module.scss'

const SponsoredConference = () => {
  return (
    <div className={styles.SponsoredConference}>
      <img
        alt={`Logo of Devternity conference`}
        src={`/sponsors/devternity.jpg`}
        className={styles.Image}
      />
      <div className={styles.Content}>
        <div>
          <Heading element='p' level={4}>
            <Link
              onClick={trackLink('outbound-sponsored')}
              url='https://devternity.com'
              external
            >
              DevTernity
            </Link>
          </Heading>
          <p>December 8, 2022 ・ Online</p>
          <p className={styles.Footer}>
            Turning developers into architects and engineering leaders
          </p>
        </div>
        {/* title='Learn more' */}
        <Link routed url='/pages/sponsorships' className={styles.sponsored}>
          sponsored
        </Link>
      </div>
    </div>
  )
}

export default SponsoredConference
