import React, { Component } from 'react';

import styles from './Heading.scss';

export default class Heading extends Component {
  render() {
    const Element = this.props.element;

    return (
      <Element className={styles.Heading}>
        {this.props.children}
      </Element>
    );
  }
}
