import React, {PureComponent} from 'react';
import classNames from 'classnames';
import styles from './Icon.scss';

import {
  loading,
} from '../../icons';

export const BUNDLED_ICONS = {
  loading,
};

const DEFAULT_COLOR = 'gray';
const DEFAULT_SIZE = 16;


export default class Icon extends PureComponent {
  render() {
    const {size, color, source, accessibilityLabel} = this.props;
    const iconSource = (BUNDLED_ICONS[source]);

    return (
      <span className={styles.Icon} aria-label={accessibilityLabel}>
        <svg
          className={
            classNames(
              styles[`size-${size || DEFAULT_SIZE}`],
              styles[`color-${color || DEFAULT_COLOR}`])
          }
          viewBox={iconSource.viewBox}
          dangerouslySetInnerHTML={{__html: iconSource.body}}
        />
      </span>
    );
  }
}
