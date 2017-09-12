import React from 'react';
import styles from './GithubStar.scss';

export default function GithubStar() {
  return (
    <div className={styles.GithubStar}>
      <a
        className="github-button"
        href="https://github.com/tech-conferences/confs.tech"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star tech-conferences/confs.tech on GitHub"
      >
        Star
      </a>
    </div>
  );
}
