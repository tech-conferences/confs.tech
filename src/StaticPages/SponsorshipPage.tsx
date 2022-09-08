import { format, addMonths, setDate } from 'date-fns'
import { range } from 'lodash'
import { Link, Page } from 'src/components'
import { sponsorConferenceForDate } from 'src/components/SponsoredConference/utils'

import styles from './SponsorshipPages.module.scss'

// Set date to middle of the month to prevent from potential time bug
const TODAY = setDate(new Date(), 15)

// Create an array of the next 10 months with availability
// Returns:
//    [
//      ['September 2022', false]
//      ['October 2022', true]
//      ...
//    ]
const SPONSORS_AVAILABILITY = range(0, 10).map((index) => {
  const sponsorDate = addMonths(TODAY, index)
  const isMonthTaken = sponsorConferenceForDate(sponsorDate)
  return [format(sponsorDate, 'MMMM yyyy'), !isMonthTaken]
})

export default function SponsorshipPage() {
  return (
    <Page
      narrow
      title='Sponsorship'
      htmlTitle='Become a sponsor of Confs.tech'
      backButton
    >
      <p>
        We reach an average of 15,000 unique visitors per months, and our
        current sponsorship rate is 100€ per month.
        <br />
        Your conference will be sponsored at the top of the list for the
        duration of the sponsorship. We encourage event organizers to also give
        a special discount for promoted events.
      </p>
      <h2>Schedule</h2>
      <dl className={styles.List}>
        {SPONSORS_AVAILABILITY.map((sponsorshipAvailability) => (
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
        Send us the details of your conference and when you want to be promoted,
        along with a square logo of your conference and we will schedule the
        sponsorship once the donation has been collected.
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
        <ul className={styles.SponsorList}>
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
      </p>
    </Page>
  )
}
