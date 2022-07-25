import Heading from '../Heading'

import SponsoredConference from './SponsoredConference'
import styles from './SponsoredConferences.module.scss'

const SPONSORED_CONFERENCES = [
  {
    img: 'sponsors/testcon.png',
    imgDark: 'sponsors/testcon.png',
    url: 'https://testcon.lt',
    name: 'TestCon Europe 2022',
    date: 'October 26-27, 2022 ・ Online',
    topics: ['testing'],
  },
  {
    img: 'sponsors/bidata.png',
    imgDark: 'sponsors/bidata-dark.png',
    url: 'https://bigdataconference.eu',
    name: 'Big Data Europe 2022',
    date: 'November 23-24, 2022 ・ Online',
    topics: ['data'],
  },
]
const SponsoredConferences = () => {
  return (
    <section>
      <header className={styles.Heading}>
        <Heading element='h3' level={4}>
          Current sponsors{' '}
          <span role='img' aria-hidden>
            ❤️
          </span>
        </Heading>
      </header>
      <div className={styles.Sponsors}>
        {SPONSORED_CONFERENCES.map((sponsoredConf) => (
          <SponsoredConference {...sponsoredConf} />
        ))}
      </div>
    </section>
  )
}

export default SponsoredConferences
