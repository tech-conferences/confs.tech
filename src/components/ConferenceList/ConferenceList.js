import React, {Component} from 'react';
import {groupBy, sortBy} from 'lodash';
import {parse, format} from 'date-fns';

import Heading from '../Heading';
import ConferenceItem from '../ConferenceItem';
import styles from './ConferenceList.css';

export default class ConferenceList extends Component {
  renderTable = () => {
    const {conferences} = this.props;
    const groupedConferences = groupBy(conferences, (conf) =>
      format(conf.startDate, 'YYYY-MM')
    );

    if (conferences.length === 0) {
      return (<p>{"Oh shoot! We don't have any conferences yet."}</p>);
    } else {
      return (
        <div className={styles.ConferenceList}>
          {getConfKeys(groupedConferences).map((groupKey) => {
            const month = groupKey.split('-')[1];
            return Months(month, groupedConferences[groupKey]);
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

function Months(month, conferences) {
  const sortedConferences = sortBy(conferences, (conference) => conference.startDate);

  return [
    <Heading key={month} element="h2" level={2}>
      {getMonthName(month)}
    </Heading>,
    sortedConferences.map((conf) => {
      return <ConferenceItem key={`${conf.url} ${conf.date}`} {...conf} />;
    }),
  ];
}

function getConfKeys(conferences) {
  return sortBy(Object.keys(conferences), (conference) => {
    return parseInt(conference.replace('-', ''), 10);
  });
}
