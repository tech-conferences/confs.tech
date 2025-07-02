import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConference.module.scss'
import { sponsorConferenceForDate } from './utils'

export interface SponsoredConf {
  name: string
  conferenceDate: string
  img: string
  imgDark: string
  url: string
  tagline: string
  discountText?: string
  discountUrl?: string
  sponsorDateStart: string
  sponsorDateEnd: string
}

const TODAY = new Date()
const sponsorConference = sponsorConferenceForDate(TODAY)

const SponsoredConference = () => {
  if (!sponsorConference) {
    return null
  }
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()
  const sponsorImgSrc =
    darkModeEnabled && sponsorConference.imgDark
      ? sponsorConference.imgDark
      : sponsorConference.img
  return (
    <div className={styles.SponsoredConference}>
      <Link url={sponsorConference.url} unstyled external>
        <img
          alt={`Logo of ${sponsorConference.name} conference`}
          src={sponsorImgSrc}
          className={styles.Image}
          width="140"
          height="70"
          loading="eager"
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
          <DiscountText
            text={sponsorConference.discountText}
            url={sponsorConference.discountUrl}
          />
        </div>
        <Link routed url='/pages/sponsorships' className={styles.sponsored}>
          sponsored
        </Link>
      </div>
    </div>
  )
}

interface DiscountProps {
  text?: string
  url?: string
}
const DiscountText = ({ text, url }: DiscountProps) => {
  if (!text) {
    return null
  }
  if (url) {
    return (
      <p className={styles.Footer}>
        <Link url={url} external>
          {text}
        </Link>
      </p>
    )
  } else {
    return <p className={styles.Footer}>{text}</p>
  }
}

export default SponsoredConference
