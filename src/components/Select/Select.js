/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import styles from './Select.scss';

export default class Select extends Component {
  componentWillMount() {
    const id = uniqueId('Select-');
    this.setState({ id });
  }

  handleSelect = event => {
    const { onChange } = this.props;

    onChange(event.target.value);
  };

  renderOptions = () => {
    const { options } = this.props;

    return options.map(option => {
      const [label, value] = option;

      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
  };

  render() {
    const { label, value } = this.props;
    const { id } = this.state;

    return (
      <div className={styles.Wrapper}>
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
        <select
          id={id}
          className={styles.Select}
          onChange={this.handleSelect}
          defaultValue={value}
        >
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}
