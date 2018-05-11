import React, {PureComponent} from 'react';
import classNames from 'classnames';
import {parse} from 'date-fns';

import {formatDate, generateEventJSONLD} from './utils';
import Heading from '../Heading';
import Link from '../Link';
import styles from './ConferenceItem.scss';

export default class ConferenceItem extends PureComponent {
  render() {
    const {
      name,
      topics,
      url,
      city,
      country,
      startDate,
      endDate,
      twitter,
      cfpEndDate,
      cfpUrl,
      showCFP,
    } = this.props;

    return (
      <li
        className={classNames(
          styles.ConferenceItem
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: generateEventJSONLD({name, url, city, country, startDate, endDate})}}
        />
        <Heading element="p" level={4}>
          <Link url={url} external>
            {name}
          </Link>
        </Heading>
        <dl>
          <div>
            <dt className="visuallyHidden">Location</dt>
            <dd className={classNames(styles.p, styles.dd)}>
              {`${Location(city, country)}`}
            </dd>
            <dt className="visuallyHidden">Date</dt>
            <dd className={classNames(styles.Date, styles.dd)}>
              {formatDate(startDate, endDate)}
            </dd>
          </div>
          {showCFP && <Cfp url={cfpUrl || url} date={cfpEndDate} />}
          {showCFP && <br />}
          <div className={classNames(styles.p, styles.Footer)}>
            <Topics topics={topics} />
            {twitter && ' – '}
            <Twitter twitter={twitter} />
          </div>
        </dl>
      </li>
    );
  }
}

function Twitter({twitter}) {
  if (!twitter) { return null; }

  return (
    <React.Fragment>
      <dt className="visuallyHidden">Twitter username</dt>
      <dd className={styles.dd}>
        <Link url={`https://twitter.com/${twitter}`} external>
          {twitter}
        </Link>
      </dd>
    </React.Fragment>
  );
}

function Location(city, country) {
  if (city && country) {
    return `${city}, ${country}`;
  }

  return country || city;
}

function Cfp({url, date}) {
  return (
    <React.Fragment>
      <dt className="visuallyHidden">Call for proposal</dt>
      <dd className={styles.dd}>
        <Link url={url} external className={styles.cfp}>
          CFP closes {formatDate(parse(date))}
        </Link>
      </dd>
    </React.Fragment>
  );
}


function Topics({topics}) {
  const topicsList = topics.map((topic) => <li key={topic}>{topic}</li>);

  return (
    <React.Fragment>
      <dt className="visuallyHidden">Topics</dt>
      <dd className={styles.dd}>
        <ul className={styles.topics}>
          {topicsList}
        </ul>
      </dd>
    </React.Fragment>
  );
}
