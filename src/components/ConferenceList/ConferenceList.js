import React, {Component} from 'react';
import {groupBy, sortBy} from 'lodash';
import {parse, format} from 'date-fns';

import Heading from '../Heading';
import Divider from '../Divider';
import ConferenceItem from '../ConferenceItem';
import styles from './ConferenceList.css';

export default class ConferenceList extends Component {
  renderConferences = (conferences) => {
    const groupedConferences = groupBy(conferences, (conf) =>
      format(conf.startDate, 'YYYY-MM')
    );

    return (
      <div className={styles.ConferenceList}>
        {getConfKeys(groupedConferences).map((groupKey) => {
          const month = groupKey.split('-')[1];
          return Months(month, groupedConferences[groupKey]);
        })}
      </div>
    );
  };

  render() {
    const {conferences} = this.props;
    const confByYear = groupBy(conferences, (conf) =>
      format(conf.startDate, 'YYYY')
    );

    if (conferences.length === 0) {
      return (<p>{"Oh shoot! We don't have any conferences yet."}</p>);
    } else {
      const confsTable = Object.keys(confByYear).map((year) => {
        return [
          <Divider key="hr" />,
          Year(year),
          this.renderConferences(confByYear[year]),
        ];
      });

      return (<div>{confsTable}</div>);
    }
  }
}

function getMonthName(month) {
  return format(parse(`2017/${month}/01`), 'MMMM');
}

function Months(month, conferences) {
  const sortedConferences = sortBy(conferences, (conference) => conference.startDate);

  return [
    <Heading key={month} element="h2" level={3}>
      {getMonthName(month)}
    </Heading>,
    sortedConferences.map((conf) => {
      return <ConferenceItem key={`${conf.url} ${conf.date}`} {...conf} />;
    }),
  ];
}

function Year(year) {
  return (
    <Heading key={year} element="h2" level={2}>
      {year}
    </Heading>
  );
}

function getConfKeys(conferences) {
  return sortBy(Object.keys(conferences), (conference) => {
    return parseInt(conference.replace('-', ''), 10);
  });
}
