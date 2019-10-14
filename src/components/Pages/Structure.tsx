import React from 'react';
import {Helmet} from 'react-helmet';
import Favicon from 'react-favicon';

import styles from './Structure.scss';
import Heading from '../Heading';
import Link from '../Link';
import GithubStar from '../GithubStar';
import TwitterFollowButton from '../TwitterFollowButton';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Structure({children, title}: Props) {
  return (
    <div>
      <Helmet>
        <title>Tech conferences | Confs.tech</title>
      </Helmet>
      <Favicon url="favicon.png" />
      <header className={styles.Header}>
        <div>
          <Heading element="h1">{title}</Heading>
          <Heading element="h2" level="sub">
            <Link routed url="/">
              Back to the conferences
            </Link>
            {/* Open-source and crowd-sourced conference website */}
          </Heading>
        </div>
        <div>
          <GithubStar />
          <TwitterFollowButton />
        </div>
      </header>
      <div className={styles.Content}>
        {children}
      </div>
    </div>
  );
}
