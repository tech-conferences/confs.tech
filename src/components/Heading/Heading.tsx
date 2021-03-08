import React from 'react'
import classNames from 'classnames'
import styles from './Heading.scss'

interface Props {
  level?: number | string
  element: string
  children: React.ReactNode
}

const Heading: React.FC<Props> = ({ level, children, ...restProps }) => {
  const Element: any = restProps.element

  return (
    <Element
      className={classNames(styles.Heading, styles[`Heading-${level || 1}`])}
    >
      <span className={styles.Inner}>{children}</span>
    </Element>
  )
}

export default Heading
