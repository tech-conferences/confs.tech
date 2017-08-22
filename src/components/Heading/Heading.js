import React, { Component } from 'react';

import './Heading.css';

export default class Heading extends Component {
  render() {
    const Element = this.props.element;

    return (
      <Element className={classNames(styles.Heading)}>
        {this.props.children}
      </Element>
    );
  }
}
