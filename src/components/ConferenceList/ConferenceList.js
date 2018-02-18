import React, {Component} from 'react';
import {groupBy, sortBy} from 'lodash';
import {parse, format} from 'date-fns';

import Heading from '../Heading';
import Divider from '../Divider';
import ConferenceItem from '../ConferenceItem';
import styles from './ConferenceList.css';

export default class ConferenceList extends Component {
  renderConferences = (conferences) => {
    return (
      <div key={'list'} className={styles.ConferenceList}>
        {getConfsMonthsSorted(conferences).map((monthKey) => {
          const month = monthKey.split('-')[1];
          return (<Months key={monthKey} month={month} conferences={conferences[monthKey]} />);
        })}
      </div>
    );
  };

  render() {
    const {conferences} = this.props;
    const confs = groupAndSortConferences(conferences);

    if (conferences.length === 0) {
      return (<p>{"Oh shoot! We don't have any conferences yet."}</p>);
    }

    const confsTable = Object.keys(confs).map((year) => {
      return [
        <Divider key="hr" />,
        <Year key={year} year={year} />,
        this.renderConferences(confs[year]),
      ];
    });

    return (<div>{confsTable}</div>);
  }
}

function groupAndSortConferences(conferences) {
  // Group conferences by year
  const confs = groupBy(conferences, (conf) =>
    format(conf.startDate, 'YYYY')
  );

  // Group conferences by month within the year
  Object.keys(confs).map((year) => {
    confs[year] = groupBy(confs[year], (conf) =>
      format(conf.startDate, 'YYYY-MM')
    );
    Object.keys(confs[year]).map((month) => {
      confs[year][month] = sortBy(confs[year][month], (conference) =>
        conference.startDate
      );
    });
  });

  return confs;
}

function getMonthName(month) {
  return format(parse(`2017/${month}/01`), 'MMMM');
}

function Months({month, conferences}) {
  return [
    <Heading key={month} element="h2" level={3}>
      {getMonthName(month)}
    </Heading>,
    conferences.map((conf) => {
      return (
        <ConferenceItem
          {...conf}
          key={`${conf.url} ${conf.date}`}
        />
      );
    }),
  ];
}

function Year({year}) {
  return (
    <Heading key={year} element="h2" level={2}>
      {year}
    </Heading>
  );
}

function getConfsMonthsSorted(conferences) {
  return sortBy(Object.keys(conferences), (conference) => {
    return parseInt(conference.replace('-', ''), 10);
  });
}
