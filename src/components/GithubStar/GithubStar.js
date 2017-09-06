import React from 'react';
import styles from './GithubStar.scss';

export default function GithubStar() {
  return (
    <div className={styles.GithubStar}>
      <a
        className="github-button"
        href="https://github.com/nimzco/confs.tech"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star nimzco/confs.tech on GitHub"
      >
        Star
      </a>
    </div>
  );
}
