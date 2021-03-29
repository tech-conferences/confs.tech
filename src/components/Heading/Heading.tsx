import classNames from 'classnames'

import styles from './Heading.module.scss'

interface Props {
  level?: number | string
  element: string
  children: React.ReactNode
}

const Heading: React.FC<Props> = ({ level, children, ...restProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
