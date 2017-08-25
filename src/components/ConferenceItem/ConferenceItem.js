import React, {PureComponent} from 'react';
import classNames from 'classnames';
import {isPast, parse, format} from 'date-fns';

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
        <Heading element="h3" level={3} className={styles.ConferenceItemTitle}>
          <Link url={url} external>
            {name}
          </Link>
        </Heading>
        <div>
          {city}, <strong>{country}</strong>
          &nbsp;–&nbsp;
          <span className={styles.Date}>
            {format(parse(startDate), 'MMM, Do')}
            {endDate && endDate !== startDate ? format(parse(endDate), '-Do') : null}
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
