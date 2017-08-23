import React, { Component } from 'react';
import classNames from 'classnames';
import { isPast, parse, format } from 'date-fns';

import Link from '../Link';
import styles from './ConferenceItem.scss';

export default class ConferenceItem extends Component {
  render() {
    const { name, url, city, country, startDate } = this.props;

    return (
      <div
        className={classNames(
          isPast(parse(startDate)) ? styles.past : '',
          styles.ConferenceItem
        )}
      >
        <div>
          <Link url={url} external>
            {name}
          </Link>
        </div>
        <div>
          {city}, <strong>{country}</strong>
          &nbsp;–&nbsp;
          {format(parse(startDate), 'MMMM, Do')}
        </div>
      </div>
    );
  }
}
