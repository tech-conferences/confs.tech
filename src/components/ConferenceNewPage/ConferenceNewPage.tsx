/* global process */
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { Moment } from 'moment'
import React, { Component } from 'react'
import { sortBy } from 'lodash'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import DatePicker from 'react-datepicker'
import Recaptcha from 'react-recaptcha'

import * as styles from './ConferenceNewPage.scss'
import Heading from '../Heading'
import Divider from '../Divider'
import Link from '../Link'
import { TOPICS } from '../config'
import './DatePickerOverrides.scss'

const SORTED_TOPICS_KEYS = sortBy(Object.keys(TOPICS), (x) =>
  TOPICS[x].toLocaleLowerCase()
)

interface Props {}

const defaultConference: Conference = {
  name: '',
  url: '',
  city: '',
  country: '',
  startDate: null,
  endDate: null,
  topic: '',
  cfpUrl: '',
  cfpEndDate: null,
  cocUrl: '',
  offersSignLanguageOrCC: false,
  twitter: '@',
  comment: '',
}

export default class ConferenceNewPage extends Component<Props> {
  private handleDateChange: {
    [key: string]: (date: Moment | null, event: any) => void
  }
  state = {
    recaptchaLoaded: false,
    captchaResponse: null,
    submitting: false,
    submitted: false,
    serverError: false,
    errors: {},
    conference: defaultConference,
  }

  constructor(props: Props) {
    super(props)

    this.handleDateChange = {
      startDate: this.handleDateChangeBuilder('startDate'),
      endDate: this.handleDateChangeBuilder('endDate'),
      cfpEndDate: this.handleDateChangeBuilder('cfpEndDate'),
    }
  }

  resetForm = () => {
    this.setState({
      submitted: false,
      submitting: false,
      conference: defaultConference,
    })
  }

  validateForm = (conference: Conference) => {
    const { topic, startDate, endDate, city, country, name, url } = conference

    const errors = {
      topic: topic.length === 0,
      // eslint-disable-next-line no-extra-boolean-cast
      startDate: !Boolean(startDate),
      // eslint-disable-next-line no-extra-boolean-cast
      endDate: !Boolean(endDate),
      city: city.length === 0,
      country: country.length === 0,
      name: name.length === 0,
      url: url.length === 0,
    }

    this.setState({ errors })
    return errors
  }

  handleStartDateSelect = (startDate: Moment | null | undefined) => {
    const {
      conference,
      conference: { endDate },
    } = this.state
    this.setState({
      conference: {
        ...conference,
        startDate,
        endDate: endDate || startDate,
      },
    })
  }

  handleFieldChange = (event: any) => {
    this.setState({
      conference: {
        ...this.state.conference,
        [event.target.name]: event.target.value,
      },
    })
  }

  handleCheckboxChange = (event: any) => {
    this.setState({
      conference: {
        ...this.state.conference,
        [event.target.name]: !this.state.conference[event.target.name],
      },
    })
  }

  handleDateChangeBuilder = (key: string) => {
    return (date: any) => {
      this.setState({
        conference: {
          ...this.state.conference,
          [key]: date,
        },
      })
    }
  }

  // Executed once the captcha has been verified
  // can be used to post forms, redirect, etc.
  handleVerifyRecaptcha = (captchaResponse: any) => {
    this.setState({ captchaResponse })
  }

  handleFormSubmit = (event: React.FormEvent) => {
    const { recaptchaLoaded, captchaResponse, conference } = this.state
    const errors = this.validateForm(conference)
    event.preventDefault()
    const cannotBeSubmitted = Object.keys(errors).some((x) => errors[x])

    if (!recaptchaLoaded || captchaResponse === null) {
      return
    }
    if (cannotBeSubmitted) {
      return
    }
    this.setState({ submitting: true })

    fetch(`${process.env.API_END_POINT_DOMAIN}/api/conferences`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: getConferenceData(conference),
    })
      .then((response) => {
        if (response.status === 200) {
          return this.setState({ submitted: true })
        } else {
          return this.setState({ submitting: false })
        }
      })
      .catch(() => {
        return this.setState({
          submitting: false,
          serverError: true,
        })
      })
  }

  handleRecaptchaLoad = () => {
    this.setState({
      recaptchaLoaded: true,
    })
  }

  hasError = (field: string) => {
    const { errors } = this.state
    return errors[field]
  }

  errorFor = (field: string, errorMessage: string) => {
    const { errors } = this.state
    if (!errors[field]) {
      return null
    }

    return <div className={styles.errorText}>{errorMessage}</div>
  }

  submitted = () => {
    return (
      <div>
        <p>Thank you for submitting a conference!</p>
        <p>
          We will soon review it, add it to the list and tweet it on{' '}
          <Link external url='https://twitter.com/ConfsTech'>
            @ConfsTech
          </Link>
          <br />
          Find your submission and track its status on{' '}
          <Link
            external
            url='https://github.com/tech-conferences/conference-data/pulls'
          >
            GitHub
          </Link>
          .
        </p>
        <p>
          <Link external url='https://github.com/tech-conferences/confs.tech/'>
            Contact us
          </Link>
          {' – '}
          <Link url='https://confs.tech/'>Go back to confs.tech</Link>
          {' – '}
          <Link onClick={this.resetForm}>Add a new conference</Link>
          {' – '}
          <Link external url='https://twitter.com/ConfsTech/'>
            Follow us on Twitter
          </Link>
        </p>
      </div>
    )
  }

  form = () => {
    const {
      recaptchaLoaded,
      captchaResponse,
      submitting,
      serverError,
      conference: {
        name,
        url,
        topic,
        city,
        country,
        cfpUrl,
        twitter,
        comment,
        cocUrl,
        offersSignLanguageOrCC,
        startDate,
        endDate,
        cfpEndDate,
      },
    } = this.state
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} autoComplete='off'>
          <InputGroup>
            <div>
              <label htmlFor='type'>Topic</label>
              <select
                id='type'
                className={classNames(this.hasError('topic') && styles.error)}
                name='topic'
                value={topic}
                required
                onChange={this.handleFieldChange}
              >
                <option key='placeholder' value=''>
                  Select a topic
                </option>
                {SORTED_TOPICS_KEYS.map((value: string) => (
                  <option key={value} value={value}>
                    {TOPICS[value]}
                  </option>
                ))}
              </select>
              {this.errorFor('topic', 'Please select a topic.')}
            </div>
          </InputGroup>
          <InputGroup>
            <div>
              <label htmlFor='name'>Conference name</label>
              <input
                className={classNames(this.hasError('name') && styles.error)}
                type='text'
                name='name'
                required
                placeholder='Conference name (without year)'
                value={name}
                id='name'
                onChange={this.handleFieldChange}
              />
              {this.errorFor('name', 'Name is required.')}
            </div>
          </InputGroup>
          <InputGroup>
            <div>
              <label htmlFor='url'>URL</label>
              <input
                className={classNames(this.hasError('url') && styles.error)}
                type='text'
                placeholder='https://confs.tech'
                required
                value={url}
                name='url'
                id='url'
                onChange={this.handleFieldChange}
              />
              {this.errorFor('url', 'Url is required.')}
            </div>
          </InputGroup>
          <InputGroup inline>
            <div>
              <label htmlFor='startDate'>Start date</label>
              <DatePicker
                dateFormat='YYYY-MM-DD'
                name='startDate'
                id='startDate'
                selected={startDate}
                onChange={this.handleStartDateSelect}
              />
              {this.errorFor('startDate', 'Start date is required.')}
            </div>
            <div>
              <label htmlFor='endDate'>End date</label>
              <DatePicker
                dateFormat='YYYY-MM-DD'
                name='endDate'
                id='endDate'
                selected={endDate}
                onChange={this.handleDateChange.endDate}
              />
            </div>
          </InputGroup>
          <InputGroup inline>
            <div>
              <label htmlFor='city'>City</label>
              <input
                className={classNames(this.hasError('city') && styles.error)}
                required
                type='text'
                id='city'
                name='city'
                placeholder='Online for online events'
                value={city}
                onChange={this.handleFieldChange}
              />
              {this.errorFor('city', 'City is required.')}
            </div>
            <div>
              <label htmlFor='country'>Country</label>
              <input
                className={classNames(this.hasError('country') && styles.error)}
                required
                type='text'
                id='country'
                name='country'
                placeholder='Online for online events'
                value={country}
                onChange={this.handleFieldChange}
              />
              {this.errorFor('country', 'Country is required.')}
            </div>
          </InputGroup>
          <InputGroup inline>
            <div>
              <label htmlFor='cfpUrl'>CFP URL</label>
              <input
                className={classNames(this.hasError('cfpUrl') && styles.error)}
                type='text'
                name='cfpUrl'
                id='cfpUrl'
                value={cfpUrl}
                onChange={this.handleFieldChange}
              />
              {this.errorFor('cfpUrl', 'CFP URL is required.')}
            </div>
            <div>
              <label htmlFor='cfpEndDate'>CFP end date</label>
              <DatePicker
                dateFormat='YYYY-MM-DD'
                name='cfpEndDate'
                id='cfpEndDate'
                selected={cfpEndDate}
                onChange={this.handleDateChange.cfpEndDate}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label htmlFor='twitter'>Conference @TwitterHandle</label>
            <input
              className={classNames(this.hasError('twitter') && styles.error)}
              type='text'
              name='twitter'
              id='twitter'
              value={twitter}
              onChange={this.handleFieldChange}
            />
            {this.errorFor('twitter', 'Twitter handle is required.')}
          </InputGroup>
          <InputGroup>
            <label htmlFor='cocUrl'>Code Of Conduct URL</label>
            <input
              type='text'
              name='cocUrl'
              id='cocUrl'
              value={cocUrl}
              onChange={this.handleFieldChange}
            />
          </InputGroup>
          <InputGroup inline>
            <input
              type='checkbox'
              name='offersSignLanguageOrCC'
              id='offersSignLanguageOrCC'
              checked={offersSignLanguageOrCC}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor='offersSignLanguageOrCC'>
              This conference offers interpretation to International sign
              language or closed captions.
            </label>
          </InputGroup>
          <InputGroup>
            <label htmlFor='comment'>
              Additional comments and info <i>(will only appear on GitHub)</i>
            </label>
            <textarea
              name='comment'
              id='comment'
              value={comment}
              onChange={this.handleFieldChange}
            />
          </InputGroup>
          <Recaptcha
            sitekey='6Lf5FEoUAAAAAJtf3_sCGAAzV221KqRS4lAX9AAs'
            render='explicit'
            verifyCallback={this.handleVerifyRecaptcha}
            onloadCallback={this.handleRecaptchaLoad}
          />
          {serverError && (
            <p className={styles.errorText}>
              An error happened from the server.
              <br />
              If it still happens, you can&nbsp;
              <Link
                external
                url='https://github.com/tech-conferences/conference-data/issues'
              >
                create an issue on our GitHub repo.
              </Link>
            </p>
          )}
          <button
            className={styles.Button}
            disabled={
              submitting || !recaptchaLoaded || captchaResponse === null
            }
            type='submit'
            value='Submit'
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <Divider />
        <Link
          external
          url='https://github.com/tech-conferences/conference-data/pulls'
        >
          Pull requests
        </Link>
        {' – '}
        <Link
          external
          url='https://github.com/tech-conferences/conference-data/issues'
        >
          Create an issue
        </Link>
        {' – '}
        <Link
          external
          url='https://github.com/tech-conferences/conference-data/'
        >
          GitHub repository
        </Link>
        {' – '}
        <Link external url='https://confs.tech/'>
          Go back to Confs.tech
        </Link>
      </div>
    )
  }

  render() {
    const { submitted } = this.state

    return (
      <div>
        <Helmet>
          <title>Suggest a conference | Confs.tech</title>
          <meta name='robots' content='noindex' />
          <script src='https://www.google.com/recaptcha/api.js' async defer />
        </Helmet>
        <Heading element='h1'>Add a new conference</Heading>
        {!submitted && (
          <div>
            <p>
              Confs.tech is focused on conferences on software development and
              related topics, such as product management, UX, and AI.
            </p>
            <p>
              Know a conference on one of these topics? Feel free to submit it
              using this form!
            </p>
            <p>
              This will create a{' '}
              <Link
                external
                url='https://github.com/tech-conferences/conference-data/pulls'
              >
                pull request on GitHub
              </Link>{' '}
              where you can also add additional comments and track submission
              status. Our team will review your request as soon as possible!
            </p>
          </div>
        )}
        {submitted ? this.submitted() : this.form()}
      </div>
    )
  }
}

interface InputGroupProps {
  children: React.ReactNode
  inline?: boolean
}

function InputGroup({ children, inline }: InputGroupProps) {
  return (
    <div
      className={classNames(
        styles.InputGroup,
        inline && styles.InputGroupInline
      )}
    >
      {children}
    </div>
  )
}

function getConferenceData(conference: Conference) {
  const { twitter, startDate, endDate, cfpEndDate } = conference

  return JSON.stringify({
    ...conference,
    twitter: twitter === '@' ? null : twitter,
    startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
    endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
    cfpEndDate: cfpEndDate ? cfpEndDate.format('YYYY-MM-DD') : null,
  })
}

export interface Conference {
  name: string
  url: string
  city: string
  country: string
  startDate: Moment | null | undefined
  endDate: Moment | null | undefined
  topic: string
  cfpUrl: string
  cfpEndDate: Moment | null | undefined
  twitter: string
  comment: string
  cocUrl: string
  offersSignLanguageOrCC: boolean
}
