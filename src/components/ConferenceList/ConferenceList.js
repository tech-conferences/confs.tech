import React, {Component} from 'react';
import {filter, groupBy, sortBy as _sortBy} from 'lodash';
import {isPast, parse, format} from 'date-fns';
import {connectInfiniteHits} from 'react-instantsearch/connectors';

import Heading from '../Heading';
import Divider from '../Divider';
import Link from '../Link';
import ConferenceItem from '../ConferenceItem';
import styles from './ConferenceList.css';

class ConferenceList extends Component {
  renderConferences = (conferences) => {
    const {showCFP} = this.props;
    return (
      <div key={'list'} className={styles.ConferenceList}>
        {getConfsMonthsSorted(conferences).map((monthKey) => {
          const month = monthKey.split('-')[1];
          return (
            <Months
              key={monthKey}
              month={month}
              showCFP={showCFP}
              conferences={conferences[monthKey]}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const {hits, showCFP, sortBy, hasMore, onLoadMore} = this.props;
    let filteredConferences = hits;
    if (showCFP) {
      filteredConferences = filter(hits, (conf) => {
        return conf.cfpEndDate && !isPast(parse(conf.cfpEndDate));
      });
    }
    const confs = groupAndSortConferences(filteredConferences, sortBy);

    const confsTable = Object.keys(confs).map((year) => {
      return [
        <Divider key="hr" />,
        <Year key={year} year={year} />,
        this.renderConferences(confs[year]),
      ];
    });

    return (
      <div>
        {confsTable}
        {hasMore &&
          <Link button onClick={onLoadMore}>
            Load more
          </Link>
        }
      </div>
    );
  }
}

function groupAndSortConferences(conferences, sortBy = 'startDate') {
  // Group conferences by year
  const confs = groupBy(conferences, (conf) =>
    format(conf[sortBy], 'YYYY')
  );

  // Group conferences by month within the year
  Object.keys(confs).map((year) => {
    confs[year] = groupBy(confs[year], (conf) =>
      format(conf[sortBy], 'YYYY-MM')
    );
    Object.keys(confs[year]).map((month) => {
      confs[year][month] = _sortBy(confs[year][month], (conference) =>
        conference[sortBy]
      );
    });
  });

  return confs;
}

function getMonthName(month) {
  return format(parse(`2017/${month}/01`), 'MMMM');
}

function Months({month, conferences, showCFP}) {
  return [
    <Heading key={month} element="h2" level={3}>
      {getMonthName(month)}
    </Heading>,
    conferences.map((conf) => {
      return (
        <ConferenceItem
          {...conf}
          key={conf.objectID}
          showCFP={showCFP}
        />
      );
    }),
  ];
}

function Year({year}) {
  return (
    <div className={styles.Year}>
      <Heading key={year} element="h2" level={2}>
        {year}
      </Heading>
      <AddConferenceLink />
    </div>
  );
}

function getConfsMonthsSorted(conferences) {
  return _sortBy(Object.keys(conferences), (conference) => {
    return parseInt(conference.replace('-', ''), 10);
  });
}

function AddConferenceLink() {
  return (
    <div className={styles.AddConfPanelWrapper}>
      <Link url="/conferences/new" routed>
        Add a conference
      </Link>
    </div>
  );
}

export default connectInfiniteHits(ConferenceList);
