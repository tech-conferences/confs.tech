import { format, addMonths, setDate } from 'date-fns'
import { range } from 'lodash'
import React from 'react'
import { Divider, Link, Page } from 'src/components'
import { sponsorConferenceForDate } from 'src/components/SponsoredConference/utils'

import styles from './SponsorshipPages.module.scss'

// Set date to middle of the month to prevent from potential time bug
const TODAY = setDate(new Date(), 15)

// Create an array of the next 10 months with availability
// Returns:
//    [
//      ['September 2022', false, 'Conference name']
//      ['October 2022', true, 'Conference name']
//      ...
//    ]
const SPONSORS_AVAILABILITY: [string, boolean, string][] = range(0, 16).map(
  (index) => {
    const sponsorDate = addMonths(TODAY, index)
    const conference = sponsorConferenceForDate(sponsorDate)
    return [
      format(sponsorDate, 'MMMM yyyy'),
      Boolean(!conference),
      conference?.name || '',
    ]
  },
)

export default function SponsorshipPage() {
  return (
    <Page
      narrow
      title='Sponsorship'
      htmlTitle='Become a sponsor of Confs.tech'
      backButton
    >
      <p>
        We reach more than 18,000 unique visitors per months, and our current
        sponsorship rate is 200€ per month.
        <br />
        When sponsoring Confs.tech, your conference will be shown at the top of
        the list for the duration of the sponsorship. We encourage event
        organizers to also give a special discount for the promoted events.
        <br />
        You can expect between 600 and 1,000 clicks per months.
      </p>
      <Divider />
      <h2>Schedule</h2>
      <dl className={styles.List}>
        {SPONSORS_AVAILABILITY.map((sponsorshipAvailability) => (
          <React.Fragment key={sponsorshipAvailability[0]}>
            <dt>{sponsorshipAvailability[0]}</dt>
            <dd>
              {sponsorshipAvailability[1] ? (
                <Link url='mailto:contact@confs.tech?subject=Sponsorship'>
                  Available
                </Link>
              ) : (
                'Sold'
              )}
              {!sponsorshipAvailability[1] &&
                process.env.NODE_ENV === 'development' &&
                ` (${sponsorshipAvailability[2]})`}
            </dd>
          </React.Fragment>
        ))}
      </dl>
      <Divider />
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
      <Divider />
      <h2>FAQ</h2>
      <h3>How do I get an invoice for my payment?</h3>
      <p>
        Since you will be paying through our{' '}
        <Link external url='https://opencollective.com/confstech/contribute'>
          OpenCollective account
        </Link>{' '}
        you will be able to get a receipt there, directly. You can find the
        details on how to do it{' '}
        <Link
          external
          url='https://docs.opencollective.com/help/financial-contributors/receipts'
        >
          in their help center.
        </Link>
      </p>
      <h3>For how many months can I be a sponsor?</h3>
      <p>
        We only allow conference organizers to take the sponsor spot for a
        maximum of 6 months.
      </p>
      <Divider />
      <h2>Past sponsors</h2>
      <p>
        Thank you to our past sponsors.
        <span role='img' aria-label='heart'>
          ❤️
        </span>
      </p>
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
    </Page>
  )
}
