import { isBefore, isAfter, parseISO } from 'date-fns'
import { trackLink } from 'src/utilities/tracking'

import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConference.module.scss'
import SPONSORS from './sponsors.json'

interface SponsoredConf {
  name: string
  conferenceDate: string
  img: string
  url: string
  tagline: string
  sponsorDateStart: string
  sponsorDateEnd: string
}

const TODAY = new Date()
const sponsorConference = (SPONSORS as SponsoredConf[]).find((conf) => {
  return (
    isBefore(TODAY, parseISO(conf.sponsorDateEnd)) &&
    isAfter(TODAY, parseISO(conf.sponsorDateStart))
  )
})

const SponsoredConference = () => {
  if (!sponsorConference) {
    return null
  }

  return (
    <div className={styles.SponsoredConference}>
      <img
        alt={`Logo of ${sponsorConference.name} conference`}
        src={sponsorConference.img}
        className={styles.Image}
      />
      <div className={styles.Content}>
        <div>
          <Heading element='p' level={4}>
            <Link
              onClick={trackLink('outbound-sponsored')}
              url={sponsorConference.url}
              external
            >
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
