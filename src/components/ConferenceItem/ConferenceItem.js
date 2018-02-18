import React, {PureComponent} from 'react';
import classNames from 'classnames';
import {isPast, parse} from 'date-fns';

import {formatDate, generateEventJSONLD} from './utils';
import Heading from '../Heading';
import Link from '../Link';
import styles from './ConferenceItem.scss';

export default class ConferenceItem extends PureComponent {
  render() {
    const {
      name,
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
      <div
        className={classNames(
          isPast(parse(startDate)) ? styles.past : '',
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
          {showCFP ? <Cfp url={cfpUrl || url} date={cfpEndDate} /> : null}
        </Heading>
        <p className={styles.p}>
          {`${Location(city, country)} - `}
          <span className={styles.Date}>
            {formatDate(startDate, endDate)}
          </span>
          {Twitter(twitter)}
        </p>
      </div>
    );
  }
}

function Twitter(twitter) {
  if (!twitter) { return null; }

  return (
    <Link url={`https://twitter.com/${twitter}`} external>
      {twitter}
    </Link>
  );
}

function Location(city, country) {
  if (city && country) {
    return `${city}, ${country}`;
  }

  return country || city;
}

function Cfp({date, url}) {
  return (
    <span className={styles.cfp}>
      <Link
        url={url}
        external
        className={styles.cfpTag}
      >
        CFP open
      </Link>
      {formatDate(parse(date))}
    </span>
  );
}
