import classNames from 'classnames'
import { Link as RoutedLink } from 'react-router-dom'

import styles from './Link.module.scss'

interface Props {
  url?: string
  selected?: boolean
  className?: string
  external?: boolean
  routed?: boolean
  button?: boolean
  unstyled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  children: React.ReactNode
}

const BtnLink: React.FC<Partial<Props>> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <button className={classNames(styles.Link, className)} onClick={onClick}>
      {children}
    </button>
  )
}

const CustomRoutedLink: React.FC<Partial<Props>> = ({
  url,
  selected,
  className,
  children,
}) => {
  return (
    <RoutedLink
      className={classNames(
        styles.Link,
        selected && styles.Selected,
        className
      )}
      to={url || ''}
    >
      {children}
    </RoutedLink>
  )
}

const Link: React.FC<Props> = ({
  url,
  external,
  onClick,
  selected = false,
  className,
  routed,
  button,
  children,
  unstyled = false,
}) => {
  if (routed) {
    return (
      <CustomRoutedLink url={url} selected={selected} className={className}>
        {children}
      </CustomRoutedLink>
    )
  }

  if (button) {
    return (
      <BtnLink onClick={onClick} className={className}>
        {children}
      </BtnLink>
    )
  }

  return (
    <a
      className={classNames(className, {
        [styles.Selected]: selected,
        [styles.Link]: !unstyled,
        [styles.unstyled]: unstyled,
      })}
      onClick={onClick}
      onTouchStart={
        onClick as React.TouchEventHandler<HTMLAnchorElement> | undefined
      }
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      href={url}
    >
      {children}
    </a>
  )
}

export default Link
