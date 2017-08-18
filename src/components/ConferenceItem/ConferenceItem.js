import React, { Component } from 'react';
import {parse, format} from 'date-fns'

export default class ConferenceItem extends Component {
  render() {
    const {name, url, city, country, startDate} = this.props;

    return (
      <tr>
        <td>
          <a href={url} target="_blank">
            {name}
          </a>
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
