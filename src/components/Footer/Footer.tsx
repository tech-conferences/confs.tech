/* eslint-disable */
import React from 'react';
import { TOPICS } from '../config';
import styles from './Footer.scss';
import Link from '../Link';
import Twitter from '../Twitter';

interface Props {
  showCFP: boolean;
  showPast: boolean;
  togglePast(evt: any): void;
}

const CURRENT_YEAR = new Date().getFullYear();
export default function Footer({ showCFP, togglePast, showPast }: Props) {
  return (
    <footer className={styles.Footer}>
      <HiddenLinks />
      <p className={styles.FooterLinks}>
        <Link url="/conferences/new" routed>
          Add a conference
        </Link>
        <Link selected={showPast} onClick={togglePast}>
          {showPast ? 'Hide past conferences' : 'See past conferences'}
        </Link>
        <Link url={getURL(showCFP)}>{showCFP ? 'Hide Call for Papers' : 'See Call for Papers'}</Link>
      </p>
      <p className={styles.FooterLinks}>
        <Link routed url="/pages/about">About Confs.tech</Link>
        <Link url="https://github.com/tech-conferences/confs.tech/" external>
          Confs.tech on GitHub
        </Link>
        <Link url="https://twitter.com/ConfsTech/" external>
          Confs.tech on Twitter
        </Link>
      </p>
      <p>
        Maintained by{' '}
        <Twitter handle='katyaprigara' />,{' '}
        <Twitter handle='nimz_co' /> and{' '}
        <Twitter handle='trivikram' />
      </p>
      <p>
        <img alt="Sponsor: Search by Algolia" src="./search-by-algolia.svg" height="20" />
      </p>
    </footer>
  );
}


function getURL(showCFP: boolean) {
  if (showCFP) {
    return `${location.pathname}`.replace('/cfp', '');
  } else {
    return `/cfp${location.pathname}`;
  }
}

function HiddenLinks() {
  return (
    <div className="visuallyHidden">
      {Object.keys(TOPICS).map((topic) => {
        return (
          <p key={topic}>
            <Link routed url={`/${topic}`}>
              {`${topic} conferences in ${CURRENT_YEAR}`}
            </Link>{' '}
            <Link routed url={`/cfp/${topic}`}>
              {`Open call for papers for ${topic} conferences in ${CURRENT_YEAR}`}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
