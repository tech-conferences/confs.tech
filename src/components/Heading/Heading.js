import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Heading.scss';

export default class Heading extends Component {
  render() {
    const { level } = this.props;
    const Element = this.props.element;

    return (
      <Element
        className={classNames(styles.Heading, styles[`Heading-${level || 1}`])}
      >
        {this.props.children}
      </Element>
    );
  }
}
