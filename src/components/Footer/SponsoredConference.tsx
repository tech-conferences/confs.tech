import React from 'react'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import Heading from '../Heading'
import Link from '../Link'

import styles from './SponsoredConferences.module.scss'

interface Props {
  img: string
  imgDark: string
  url: string
  name: string
  date: string
  topics: string[]
}

const SponsoredConference: React.FC<Props> = ({
  img,
  imgDark,
  url,
  name,
  date,
  topics,
}) => {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  return (
    <Link className={styles.Conference} unstyled url={url} external>
      <div className={styles.Content}>
        <Heading element='p' level={4}>
          {name}
        </Heading>
        <p className={styles.Date}>{date}</p>
        <p className={styles.Date}>{topics.map((topic) => `#${topic}`)}</p>
      </div>
      <img
        alt={`Logo of ${name}`}
        src={darkModeEnabled ? img : imgDark}
        className={styles.Image}
      />
    </Link>
  )
}

export default SponsoredConference
