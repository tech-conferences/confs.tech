import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { Heading, Link } from 'src/components'
import { Conference } from 'types/conference'

import styles from './ConferenceItem.module.scss'
import { formatDate, generateEventJSONLD } from './utils'

interface Props {
  showCFP: boolean
}

export default class ConferenceItem extends PureComponent<Props & Conference> {
  render() {
    const {
      name,
      topics,
      url,
      city,
      country,
      online,
      startDate,
      endDate,
      bluesky,
      mastodon,
      twitter,
      cfpEndDate,
      cfpUrl,
      showCFP,
      offersSignLanguageOrCC,
      cocUrl,
    } = this.props

    return (
      <li
        className={classNames(styles.ConferenceItem)}
        id={idify(name, startDate)}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: generateEventJSONLD({
              name,
              url,
              city,
              country,
              startDate,
              endDate,
            }),
          }}
        />
        <dl className={styles.dl}>
          <dt className='visuallyHidden'>Conference name</dt>
          <Heading element='dd' level={4}>
            <Link url={url} external>
              {name}
            </Link>
          </Heading>
          <dt className='visuallyHidden'>Location and date</dt>
          <dd>
            <p className={styles.p}>
              {Location(city, country, online)}
              <span aria-hidden='true'>・</span>
              <span className={styles.Date}>
                {formatDate(startDate, endDate)}
              </span>
            </p>
          </dd>
          {offersSignLanguageOrCC && (
            <>
              <dt className='visuallyHidden'>Accessibility</dt>
              <dd>
                Offers interpretation to International sign language or closed
                captions.
              </dd>
            </>
          )}
          {showCFP && <Cfp url={cfpUrl || url} date={cfpEndDate} />}
          <div className={classNames(styles.topicsList, styles.Footer)}>
            <Topics topics={topics} />
          </div>
          {bluesky && (
            <div className={styles.Footer}>
              <Bluesky bluesky={bluesky} />
            </div>
          )}
          {mastodon && (
            <div className={styles.Footer}>
              <Mastodon mastodon={mastodon} />
            </div>
          )}
          {twitter && (
            <div className={styles.Footer}>
              <Twitter twitter={twitter} />
            </div>
          )}
          {cocUrl && (
            <>
              <dt className='visuallyHidden'>Link to code of conduct</dt>
              <dd>
                <span className={styles.muted} aria-hidden='true'>
                  ・
                </span>
                <Link url={cocUrl} external muted>
                  Code Of Conduct
                </Link>
              </dd>
            </>
          )}
        </dl>
      </li>
    )
  }
}

interface BlueskyProps {
  bluesky: string
}

function Bluesky({ bluesky }: BlueskyProps) {
  return (
    <>
      <dt className='visuallyHidden'>Bluesky handle</dt>
      <dd>
        <span aria-hidden='true'>・</span>
        <Link url={`https://bsky.app/profile/${bluesky}`} external muted>
          @{bluesky}
        </Link>
      </dd>
    </>
  )
}

interface TwitterProps {
  twitter: string
}
function Twitter({ twitter }: TwitterProps) {
  return (
    <>
      <dt className='visuallyHidden'>Twitter username</dt>
      <dd>
        <span aria-hidden='true'>・</span>
        <Link url={`https://twitter.com/${twitter}`} external muted>
          {twitter}
        </Link>
      </dd>
    </>
  )
}

interface MastodonProps {
  mastodon: string
}

function Mastodon({ mastodon }: MastodonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, username, domain] = mastodon.split('@')

  return (
    <>
      <dt className='visuallyHidden'>Mastodon username</dt>
      <dd>
        <span aria-hidden='true'>・</span>
        <Link url={`https://${domain}/@${username}`} external muted>
          @{username}
        </Link>
      </dd>
    </>
  )
}

function Location(city: string, country: string, online: boolean) {
  switch (true) {
    case online && !city:
      return 'Online'
    case online && city !== null:
      return `${city}, ${country} & Online`
    default:
      return `${city}, ${country}`
  }
}

interface CfpProps {
  url: string
  date: string
}

function Cfp({ url, date }: CfpProps) {
  return (
    <>
      <dt className='visuallyHidden'>Call for paper end date</dt>
      <dd>
        <Link url={url} external className={styles.cfp}>
          CFP closes {formatDate(date)}
        </Link>
      </dd>
    </>
  )
}

interface TopicsProps {
  topics: string[]
}

function Topics({ topics }: TopicsProps) {
  const topicsList = topics.map((topic) => (
    <li key={topic} className={styles.topic}>
      <span aria-hidden='true'>#</span>
      {topic}
    </li>
  ))

  return (
    <>
      <dt className='visuallyHidden'>Topics</dt>
      <dd>
        <ul className={styles.topics}>{topicsList}</ul>
      </dd>
    </>
  )
}

function idify(conferenceName: string, startDate: string) {
  return `${conferenceName.toLocaleLowerCase().replace(/ /g, '-')}-${startDate}`
}
