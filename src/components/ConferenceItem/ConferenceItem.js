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
        <Heading element="h3" level={3}>
          <Link url={url} external>
            {name}
          </Link>
        </Heading>
        <div>
          {`${city}, ${country} - `}
          <span className={styles.Date}>
            {formatDate(startDate, endDate)}
          </span>
          {Twitter(twitter)}
        </div>
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
