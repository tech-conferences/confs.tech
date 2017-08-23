import React, { Component } from 'react';
import { groupBy } from 'lodash';
import { parse, format } from 'date-fns';

import Heading from '../Heading';
import ConferenceItem from '../ConferenceItem';
import styles from './ConferenceList.css';

export default class ConferenceList extends Component {
  renderMonth = (month, conferences) => {
    return [
      <Heading element="h2" level={2}>
        {getMonthName(month)}
      </Heading>,
      conferences.map(conf => {
        return <ConferenceItem key={`${conf.url} ${conf.date}`} {...conf} />;
      })
    ];
  };

  renderTable = () => {
    const { conferences, sortDateDirection } = this.props;
    const groupedConferences = groupBy(conferences, conf =>
      format(conf.startDate, 'M')
    );

    if (conferences.length === 0) {
      return <p>Oh shoot! We don't have any conferences yet. :(</p>;
    } else {
      return (
        <div className={styles.ConferenceList}>
          {months(groupedConferences, sortDateDirection).map(month => {
            return this.renderMonth(month, groupedConferences[month]);
          })}
        </div>
      );
    }
  };

  render() {
    return this.renderTable();
  }
}

function getMonthName(month) {
  return format(parse(`2017/${month}/01`), 'MMMM');
}

function months(groupedConferences, sortDirection) {
  if (sortDirection === 'asc') {
    return Object.keys(groupedConferences);
  } else {
    return Object.keys(groupedConferences).reverse();
  }
}
