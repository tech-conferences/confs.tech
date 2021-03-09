/* eslint-disable */
import React from 'react';
import {TOPICS} from '../config';
import styles from './Footer.scss';
import Link from '../Link';
import Twitter from '../Twitter';

import { useDarkModeContext } from 'src/contexts/DarkModeContext'

interface Props {
  showCFP: boolean;
  showPast: boolean;
  cfpUrl: string;
  togglePast(evt: React.MouseEvent<HTMLElement>): void;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({showCFP, togglePast, showPast, cfpUrl}: Props) {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

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
        <Link url={cfpUrl}>
          {showCFP ? 'Hide Call for Papers' : 'See Call for Papers'}
        </Link>
      </p>
      <p className={styles.FooterLinks}>
        <Link routed url="/pages/about">
          About Confs.tech
        </Link>
        <Link url="https://github.com/tech-conferences/confs.tech/" external>
          Confs.tech on GitHub
        </Link>
        <Link url="https://twitter.com/ConfsTech/" external>
          Follow us on Twitter
        </Link>
        <Link
          url="https://tech.us19.list-manage.com/subscribe?u=246492d8cf0efc8c4ec6a9a60&id=84b8d4723e"
          external
        >
          Subscribe to our newsletter
        </Link>
      </p>
      <p>
        Active maintainers: <Twitter handle="cgrail" /> · <Twitter handle="katyaprigara" /> · <Twitter handle="nimz_co" />
      </p>
      <p>
        <img
          alt="Sponsor: Search by Algolia"
          src={darkModeEnabled ? '/search-by-algolia-dark.svg' : '/search-by-algolia.svg'}
          height="20"
        />
      </p>
    </footer>
  );
}

function HiddenLinks() {
  return (
    <div className="visuallyHidden">
      {Object.keys(TOPICS).map(topic => {
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
