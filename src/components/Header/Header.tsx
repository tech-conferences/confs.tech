import React from 'react'

import { GithubStar, Heading } from 'src/components'

import styles from './Header.scss'

interface Props {
  searchEngineTitle?: string
  title: string
  subtitle?: string
}

const Header: React.FC<Props> = ({ searchEngineTitle, title, subtitle }) => {
  return (
    <header className={styles.Header}>
      <div>
        <h1 className='visuallyHidden'>{searchEngineTitle || title}</h1>
        <Heading element='p'>{title}</Heading>
        {subtitle && (
          <Heading element='h2' level='sub'>
            {subtitle}
          </Heading>
        )}
      </div>
      <GithubStar />
    </header>
  )
}

export default Header
