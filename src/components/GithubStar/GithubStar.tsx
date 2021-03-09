import React from 'react'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import styles from './GithubStar.scss'
export default function GithubStar() {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()
  return (
    <div className={styles.GithubStar}>
      <a
        className='github-button'
        href='https://github.com/tech-conferences/confs.tech'
        data-icon='octicon-star'
        data-size='large'
        data-show-count='true'
        aria-label='Star tech-conferences/confs.tech on GitHub'
        data-color-scheme={darkModeEnabled ? 'dark' : 'light'}
      >
        Star
      </a>
    </div>
  )
}
