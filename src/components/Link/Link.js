import React, {PureComponent} from 'react';

import styles from './Link.scss';

export default class Link extends PureComponent {
  render() {
    const {url, external, onClick} = this.props;

    return (
      <a
        className={styles.Link}
        onClick={onClick}
        target={external ? '_blank' : null}
        href={url}
      >
        {this.props.children}
      </a>
    );
  }
}
