import React, {PureComponent} from 'react';
import classNames from 'classnames';
import {isPast, parse, format} from 'date-fns';

import Heading from '../Heading';
import Link from '../Link';
import styles from './ConferenceItem.scss';

export default class ConferenceItem extends PureComponent {
  render() {
    const {name, url, city, country, startDate} = this.props;

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
          {format(parse(startDate), 'MMMM, Do')}
        </div>
      </div>
    );
  }
}
