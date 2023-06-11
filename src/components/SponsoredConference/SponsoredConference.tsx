import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConference.module.scss'
import { sponsorConferenceForDate } from './utils'

export interface SponsoredConf {
  name: string
  conferenceDate: string
  img: string
  url: string
  tagline: string
  sponsorDateStart: string
  sponsorDateEnd: string
}

const TODAY = new Date()
const sponsorConference = sponsorConferenceForDate(TODAY)

const SponsoredConference = () => {
  if (!sponsorConference) {
    return null
  }

  return (
    <div className={styles.SponsoredConference}>
      <Link url={sponsorConference.url} unstyled external>
        <img
          alt={`Logo of ${sponsorConference.name} conference`}
          src={sponsorConference.img}
          className={styles.Image}
        />
      </Link>
      <div className={styles.Content}>
        <div>
          <Heading element='p' level={4}>
            <Link url={sponsorConference.url} external>
              {sponsorConference.name}
            </Link>
          </Heading>
          <p>{sponsorConference.conferenceDate}</p>
          <p className={styles.Footer}>{sponsorConference.tagline}</p>
        </div>
        <Link routed url='/pages/sponsorships' className={styles.sponsored}>
          sponsored
        </Link>
      </div>
    </div>
  )
}

export default SponsoredConference
