import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Link as RoutedLink } from 'react-router-dom'

import styles from './Link.scss'

interface Props {
  url?: string
  selected?: boolean
  className?: string
  external?: boolean
  routed?: boolean
  button?: boolean
  onClick?(evt: any): void
}

export default class Link extends PureComponent<Props> {
  static defaultProps = {
    selected: false,
  }

  routedLink() {
    const { url, selected, className } = this.props

    return (
      <RoutedLink
        className={classNames(
          styles.Link,
          selected && styles.Selected,
          className
        )}
        to={url || ''}
      >
        {this.props.children}
      </RoutedLink>
    )
  }

  btnLink() {
    const { onClick, className } = this.props

    return (
      <button className={classNames(styles.Link, className)} onClick={onClick}>
        {this.props.children}
      </button>
    )
  }

  render() {
    const {
      url,
      external,
      onClick,
      selected,
      className,
      routed,
      button,
    } = this.props

    if (routed) {
      return this.routedLink()
    }

    if (button) {
      return this.btnLink()
    }

    return (
      <a
        className={classNames(
          styles.Link,
          selected && styles.Selected,
          className
        )}
        onClick={onClick}
        onTouchStart={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        href={url}
      >
        {this.props.children}
      </a>
    )
  }
}
