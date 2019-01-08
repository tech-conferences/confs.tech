/* eslint-disable */
import React from 'react';
import { SearchBox } from 'react-instantsearch/dom';
import styles from './Search.scss';

export default function Search() {
  return (
    <div className={styles.Search}>
      <SearchBox />
    </div>
  );
}
