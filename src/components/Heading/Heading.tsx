import React, {PureComponent} from 'react';
import classNames from 'classnames';

import styles from './Heading.scss';

interface Props {
  level?: number | string;
  element: string;
}

export default class Heading extends PureComponent<Props> {
  render() {
    const {level} = this.props;
    const Element = this.props.element;

    return (
      <Element
        className={classNames(styles.Heading, styles[`Heading-${level || 1}`])}
      >
        <span className={styles.Inner}>
          {this.props.children}
        </span>
      </Element>
    );
  }
}
