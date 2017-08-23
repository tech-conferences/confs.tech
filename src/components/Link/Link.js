import React, {PureComponent} from 'react';
import classNames from 'classnames';

import styles from './Link.scss';

export default class Link extends PureComponent {
  defaultProps = {
    selected: false,
  };

  render() {
    const {url, external, onClick, selected, dataValue} = this.props;

    return (
      <a
        className={classNames(styles.Link, selected && styles.Selected)}
        onClick={onClick}
        target={external ? '_blank' : null}
        data-value={dataValue}
        href={url}
      >
        {this.props.children}
      </a>
    );
  }
}
