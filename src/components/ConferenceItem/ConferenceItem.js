import React, { Component } from 'react';
import { isPast, parse, format } from 'date-fns';

import Link from '../Link';
import styles from './ConferenceItem.css';

export default class ConferenceItem extends Component {
  render() {
    const { name, url, city, country, startDate } = this.props;

    return (
      <tr className={isPast(parse(startDate)) ? styles.past : ''}>
        <td>
          <Link url={url} external>
            {name}
          </Link>
        </td>
        <td>
          {city}, <strong>{country}</strong>
        </td>
        <td>
          {format(parse(startDate), 'MMMM, Do')}
        </td>
      </tr>
    );
  }
}
