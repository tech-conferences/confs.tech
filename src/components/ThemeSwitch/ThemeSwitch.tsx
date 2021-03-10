import classnames from 'classnames'
import React from 'react'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import styles from './ThemeSwitch.scss'

const ThemeSwitch: React.FC = () => {
  const {
    values: { darkModeEnabled },
    actions: { toggleDarkMode },
  } = useDarkModeContext()

  return (
    <button
      className={classnames(styles.ThemeSwitch, {
        [styles.dark]: darkModeEnabled,
      })}
      onClick={toggleDarkMode}
      title={darkModeEnabled ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={styles.Toggle}></span>
    </button>
  )
}
export default ThemeSwitch
