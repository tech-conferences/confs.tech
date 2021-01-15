import React from 'react'
import styles from './Banner.scss'

export default function Banner() {
  return (
    <div className={styles.Banner}>
      ❗ Due to the COVID-19 outbreak, some of the events have been canceled or
      postponed. Please check conference's official website for the up-to-date
      information.
    </div>
  )
}
