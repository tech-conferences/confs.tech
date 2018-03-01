/* global process */
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import React, {Component} from 'react';
import classNames from 'classnames';
import {Helmet} from 'react-helmet';
import DatePicker from 'react-datepicker';
import Recaptcha from 'react-recaptcha';

import styles from './ConferenceNewPage.scss';
import Heading from '../Heading';
import {TOPICS} from '../config';
import './DatePickerOverrides.scss';


export default class ConferenceNewPage extends Component {
  state = {
    recaptchaLoaded: false,
    captchaResponse: null,
    submitted: false,
    errors: {},
    conference: {
      name: '',
      cfpUrl: '',
      city: '',
      country: '',
      endDate: null,
      url: '',
      startDate: null,
      topic: 'javascript',
      twitter: '@',
    },
  };

  constructor(props) {
    super(props);

    this.handleDateChange = {
      startDate: this.handleDateChangeBuilder('startDate'),
      endDate: this.handleDateChangeBuilder('endDate'),
      cfpEndDate: this.handleDateChangeBuilder('cfpEndDate'),
    };
  }

  validateForm = (conference) => {
    const {startDate, endDate, city, country, name, url} = conference;

    const errors = {
      startDate: Boolean(startDate),
      endDate: Boolean(endDate),
      city: city.length === 0,
      country: country.length === 0,
      name: name.length === 0,
      url: url.length === 0,
    };

    this.setState({errors});
    return errors;
  };

  handleFieldChange = (event) => {
    this.setState({
      conference: {
        ...this.state.conference,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleDateChangeBuilder = (key) => {
    return (date) => {
      this.setState({
        conference: {
          ...this.state.conference,
          [key]: date,
        },
      });
    };
  };

  // Executed once the captcha has been verified
  // can be used to post forms, redirect, etc.
  handleVerifyRecaptcha = (captchaResponse) => {
    this.setState({captchaResponse});
  };

  handleFormSubmit = (event) => {
    const {recaptchaLoaded, captchaResponse, conference} = this.state;
    const errors = this.validateForm(conference);
    event.preventDefault();
    const cannotBeSubmitted = Object.keys(errors).some((x) => errors[x]);

    if (!recaptchaLoaded || captchaResponse === null) { return; }
    if (!cannotBeSubmitted) { return; }

    fetch(`${process.env.API_END_POINT_DOMAIN}/conferences`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: getConferenceData(conference),
    });
  };

  handleRecaptchaLoad = () => {
    this.setState({
      recaptchaLoaded: true,
    });
  };

  hasError = (field) => {
    const {errors} = this.state;
    return errors[field];
  };

  errorFor = (field) => {
    const {errors} = this.state;
    if (!errors[field]) { return null; }

    return <div className={styles.errorText}>{field} required</div>;
  };

  submitted = () => {
    return (
      <div>
        <p>
          Thank you for submitting a conference!
        </p>
        <p>
          We`ll revise soon and add it to the list.
        </p>
      </div>
    );
  };

  form = () => {
    const {
      recaptchaLoaded,
      conference: {
        name,
        url,
        topic,
        city,
        country,
        cfpUrl,
        twitter,
        startDate,
        endDate,
      },
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} autoComplete="off">
        <InputGroup>
          <label htmlFor="type">Topic</label>
          <select
            name="topic"
            value={topic}
            onChange={this.handleFieldChange}
          >
            {Object.keys(TOPICS).map((value) => (
              <option key={value} value={value}>
                {TOPICS[value]}
              </option>
            ))}
          </select>
        </InputGroup>
        <InputGroup inline>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className={classNames(
                this.hasError('name') && styles.error
              )}
              type="text"
              name="name"
              required
              value={name}
              onChange={this.handleFieldChange}
            />
            {this.errorFor('name', 'Name is required.')}
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              className={classNames(
                this.hasError('url') && styles.error
              )}
              type="text"
              required
              value={url}
              name="url"
              onChange={this.handleFieldChange}
            />
            {this.errorFor('url', 'Url is required.')}
          </div>
        </InputGroup>
        <InputGroup inline>
          <div>
            <label htmlFor="startDate">Start date</label>
            <div>
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={this.handleDateChange.startDate}
              />
            </div>
          </div>
          <div>
            <label htmlFor="endDate">End date</label>
            <div>
              <DatePicker
                name="endDate"
                selected={endDate}
                onChange={this.handleDateChange.endDate}
              />
            </div>
          </div>
        </InputGroup>
        <InputGroup inline>
          <div>
            <label htmlFor="city">City</label>
            <input
              className={classNames(
                this.hasError('city') && styles.error
              )}
              required
              type="text"
              name="city"
              value={city}
              onChange={this.handleFieldChange}
            />
            {this.errorFor('city', 'City is required.')}
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              className={classNames(
                this.hasError('country') && styles.error
              )}
              required
              type="text"
              name="country"
              value={country}
              onChange={this.handleFieldChange}
            />
            {this.errorFor('country', 'Country is required.')}
          </div>
        </InputGroup>
        <InputGroup inline>
          <div>
            <label htmlFor="cfpUrl">CFP URL</label>
            <input
              className={classNames(
                this.hasError('cfpUrl') && styles.error
              )}
              type="text"
              name="cfpUrl"
              value={cfpUrl}
              onChange={this.handleFieldChange}
            />
            {this.errorFor('cfpUrl', 'CFP URL is required.')}
          </div>
          <div>
            <label htmlFor="cfpEndDate">CFP end date</label>
            <div>
              <DatePicker
                name="cfpEndDate"
                selected={this.state.cfpEndDate}
                onChange={this.handleDateChange.cfpEndDate}
              />
            </div>
          </div>
        </InputGroup>
        <InputGroup>
          <label htmlFor="twitter">@TwitterHandle</label>
          <input
            className={classNames(
              this.hasError('twitter') && styles.error
            )}
            type="text"
            name="twitter"
            value={twitter}
            onChange={this.handleFieldChange}
          />
          {this.errorFor('twitter', 'Twitter handle is required.')}
        </InputGroup>
        <Recaptcha
          sitekey="6Lf5FEoUAAAAAJtf3_sCGAAzV221KqRS4lAX9AAs"
          render="explicit"
          verifyCallback={this.handleVerifyRecaptcha}
          onloadCallback={this.handleRecaptchaLoad}
        />
        <button
          className={styles.Button}
          disabled={!recaptchaLoaded}
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>
    );
  };

  render() {
    const {submitted} = this.state;

    return (
      <div>
        <Helmet>
          <title>Suggest a conference | Confs.tech</title>
          <meta name="robots" content="noindex" />
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
        <Heading element="h1">Add a new conference</Heading>
        {submitted ? this.submitted() : this.form()}
      </div>
    );
  }
}

function InputGroup({children, inline}) {
  return (
    <div className={classNames(styles.InputGroup, inline && styles.InputGroupInline)}>
      {children}
    </div>
  );
}

function getConferenceData(conference) {
  const {twitter, startDate, endDate, cfpEndDate} = conference;

  return JSON.stringify({
    ...conference,
    twitter: twitter === '@' ? null : twitter,
    startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
    endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
    cfpEndDate: cfpEndDate ? cfpEndDate.format('YYYY-MM-DD') : null,
  });
}
