import { Link, Page } from 'src/components'

import styles from './SponsorshipPages.module.scss'

// Month, availability
const SPONSORS = [
  ['September 2022', false],
  ['October 2022', false],
  ['November 2022', false],
  ['December 2022', false],
  ['January 2023', true],
  ['February 2023', true],
  ['March 2023', true],
  ['April 2023', true],
  ['May 2023', true],
  ['June 2023', true],
  ['July 2023', true],
]

export default function SponsorshipPage() {
  return (
    <Page
      narrow
      title='Sponsorship'
      htmlTitle='Become a sponsor of Confs.tech'
      backButton
    >
      <p>
        We reach an average of over 15,000 unique visitors per months, and our
        current sponsorship rate is 100€ per month.
        <br />
        Your conference will be sponsored at the top of the list for the
        duration of the sponsorship. We encourage event organizers to also give
        a special discount for sponsored events.
      </p>
      <h2>Schedule</h2>
      <dl className={styles.List}>
        {SPONSORS.map((sponsorshipAvailability) => (
          <>
            <dt>{sponsorshipAvailability[0]}</dt>
            <dd>
              {sponsorshipAvailability[1] ? (
                <Link url='mailto:contact@confs.tech?subject=Sponsorship'>
                  Available
                </Link>
              ) : (
                'Sold'
              )}
            </dd>
          </>
        ))}
      </dl>

      <h2>Why sponsorships & how it works</h2>
      <p>
        Send us the details of your conference and when you want to be
        sponsored, along with a square logo of your conference and we will
        schedule the sponsorship once the donation has been collected.
        <br />
        We collect money through our{' '}
        <Link external url='https://opencollective.com/confstech/contribute'>
          OpenCollective account
        </Link>
        . All funds are used to cover the operation costs related to running
        Confs.tech: servers, domain name and more.
      </p>
      <h2>Past sponsors</h2>
      <p>
        Thank you to our past sponsors.
        <span role='img' aria-label='heart'>
          ❤️
        </span>
      </p>
      <ul>
        <li>
          <Link external url='https://www.dotconferences.com/'>
            dotConferences
          </Link>
        </li>
        <li>
          <Link external url='https://devternity.com/'>
            DevTernity
          </Link>
        </li>
        <li>
          <Link external url='https://testcon.lt/'>
            TestCon Europe
          </Link>
        </li>
        <li>
          <Link external url='https://bigdataconference.eu/'>
            BigData Europe
          </Link>
        </li>
      </ul>
    </Page>
  )
}
