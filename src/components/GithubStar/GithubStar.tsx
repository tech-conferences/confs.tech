import Helmet from 'react-helmet'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import styles from './GithubStar.module.scss'

const GithubStar = () => {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  return (
    <>
      <Helmet>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Helmet>

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
    </>
  )
}

export default GithubStar
