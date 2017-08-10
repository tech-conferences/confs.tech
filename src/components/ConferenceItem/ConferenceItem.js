import React, { Component } from 'react';
import moment from 'moment';

export default class ConferenceItem extends Component {
  render() {
    const {name, url, city, country, date} = this.props;
    const confDate = moment(date, 'YYYY-MM-DD');
    // {confDate.format('dddd MMMM d')}

    return (
      <tr>
        <td>
          <a href={url} target="_blank">
            {name}
          </a>
        </td>
        <td>
          {city}, {country}
        </td>
        <td>
          {date}
        </td>
      </tr>
    );
  }
}
