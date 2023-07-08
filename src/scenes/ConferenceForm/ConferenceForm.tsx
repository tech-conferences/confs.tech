import 'react-datepicker/dist/react-datepicker.css'

import classNames from 'classnames'
import { sortBy } from 'lodash'
import { useState, useRef, ChangeEvent } from 'react'
import DatePicker from 'react-datepicker'
import { Helmet } from 'react-helmet'
import Recaptcha from 'react-recaptcha'
import Select from 'react-select'
import { Card, Link, InputGroup, Page, Divider } from 'src/components'
import Alert from 'src/components/Alert'
import { TOPICS, LOCALES } from 'src/components/config'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import './DatePickerOverrides.module.scss'

import styles from './ConferenceForm.module.scss'
import { ServerError } from './components'
import { Conference } from './types/Conference'
import {
  LOCATION_ONLINE_REGEX,
  isValidTwitterHandle,
  isValidMastodonHandle,
  VALID_URL_REGEX,
  URL_PARAMETER_REGEX,
  URL_SHORTENER_REGEX,
  UNWANTED_CONFERENCE_NAME_REGEX,
  UNWANTED_CONFERENCE_URL_REGEX,
  showWarningForTopics,
} from './utils'
import {
  getConferenceData,
  CONFERENCE_DATE_FORMAT,
} from './utils/getConferenceData'

const SORTED_TOPICS_KEYS = sortBy(Object.keys(TOPICS), (x) =>
  TOPICS[x].toLocaleLowerCase()
)

const topicOptions = SORTED_TOPICS_KEYS.map((topic) => {
  return {
    value: topic,
    label: TOPICS[topic],
  }
})

const langOptions = Object.keys(LOCALES).map((locale) => {
  return {
    value: locale,
    label: LOCALES[locale],
  }
})

const LOCATION_TYPES = [
  {
    value: 'online',
    name: 'Online',
  },
  {
    value: 'in-person',
    name: 'In person',
  },
  {
    value: 'hybrid',
    name: 'In person & online',
  },
]

const defaultConference: Conference = {
  name: '',
  url: '',
  city: '',
  country: '',
  startDate: null,
  endDate: null,
  locales: ['EN'],
  topics: [],
  cfpUrl: '',
  cfpEndDate: null,
  cocUrl: '',
  online: true,
  offersSignLanguageOrCC: false,
  twitter: '@',
  github: '',
  mastodon: '',
}

export enum ServerErrorEnum {
  None = 0,
  AlreadyExists = 1,
  Generic = 10,
}

const ConferenceForm: React.FC = () => {
  const endDateDatepickerRef = useRef<DatePicker>(null)
  const [locationType, setLocationType] = useState('online')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [captchaResponse, setCaptchaResponse] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(ServerErrorEnum.None)
  const [errors, setErrors] = useState({})
  const [conference, setConference] = useState(defaultConference)
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  const handleDateChangeBuilder = (key: string) => {
    return (date: Date) => {
      setConference({
        ...conference,
        [key]: date,
      })
    }
  }

  const handleDateChange = {
    startDate: handleDateChangeBuilder('startDate'),
    endDate: handleDateChangeBuilder('endDate'),
    cfpEndDate: handleDateChangeBuilder('cfpEndDate'),
  }

  const isUrlValid = (url: string) => {
    return (
      VALID_URL_REGEX.test(url) &&
      !URL_PARAMETER_REGEX.test(url) &&
      !URL_SHORTENER_REGEX.test(url) &&
      !UNWANTED_CONFERENCE_URL_REGEX.test(url)
    )
  }

  const validateForm = (conference: Conference) => {
    if (conference.twitter === '@') conference.twitter = ''
    const {
      startDate,
      endDate,
      locales,
      topics,
      city,
      country,
      name,
      url,
      cfpUrl,
      cfpEndDate,
      twitter,
      mastodon,
    } = conference

    const isNotOnline = locationType !== 'online'
    const cfp = cfpUrl || cfpEndDate
    const errors = {
      locales: locales.length === 0,
      topics: topics.length === 0,
      tooManyTopics: topics.length > 3,
      name: startDate
        ? name.indexOf(startDate.getFullYear().toString().substring(2, 4)) !==
          -1
        : false,
      url: !isUrlValid(url),
      endDate: startDate && endDate ? startDate > endDate : false,
      city: isNotOnline && LOCATION_ONLINE_REGEX.test(city),
      country: isNotOnline && LOCATION_ONLINE_REGEX.test(country),
      cfpUrl: cfpUrl.length === 0 ? cfp : !isUrlValid(cfpUrl) || url == cfpUrl,
      cfpEndDate: startDate && cfpEndDate ? cfpEndDate >= startDate : cfp,
      twitter: !isValidTwitterHandle(twitter),
      mastodon: !isValidMastodonHandle(mastodon),
      unwantedConference:
        name.length > 0 && UNWANTED_CONFERENCE_NAME_REGEX.test(name),
    }

    setErrors(errors)
    return errors
  }

  const handleStartDateSelect = (startDate: Date) => {
    const { endDate } = conference
    endDateDatepickerRef.current?.setFocus()

    setConference({
      ...conference,
      startDate,
      endDate: endDate || startDate,
    })
  }

  const handleFieldChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setConference({
      ...conference,
      [event.target.name]: event.target.value,
    })
  }

  const handleLocationTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocationType(event.target.value)
    setConference({
      ...conference,
      online: ['online', 'hybrid'].includes(event.target.value),
    })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConference({
      ...conference,
      [event.target.name]: !conference[event.target.name],
    })
  }

  // Executed once the captcha has been verified
  // can be used to post forms, redirect, etc.
  const handleVerifyRecaptcha = (captchaResponse: string) => {
    setCaptchaResponse(captchaResponse)
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    const errors = validateForm(conference)
    event.preventDefault()
    const erroneousFieldId = Object.keys(errors).find((x) => errors[x])

    if (!recaptchaLoaded || captchaResponse === null) {
      return
    }
    if (erroneousFieldId) {
      const erroneousField = document.getElementById(erroneousFieldId)
      if (erroneousField && erroneousField.focus) {
        erroneousField.focus()
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    setSubmitting(true)

    fetch(`${process.env.REACT_APP_API_END_POINT_DOMAIN}/api/conferences`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: getConferenceData(conference),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          setSubmitting(false)
          if (responseJson.error.uuid) {
            setServerError(ServerErrorEnum.AlreadyExists)
          } else {
            setServerError(ServerErrorEnum.Generic)
          }
          return
        }
        const pullRequestUrl = responseJson.data.find(
          (element: string[]) => element[0] == 'html_url'
        )
        if (pullRequestUrl) {
          window.location.href = pullRequestUrl[1]
        }
      })
      .catch(() => {
        setSubmitting(false)
        setServerError(ServerErrorEnum.Generic)
      })
  }

  const hasError = (field: string) => {
    return errors[field]
  }

  const errorFor = (field: string, errorMessage: string) => {
    if (!errors[field]) {
      return null
    }

    return <div className={styles.errorText}>{errorMessage}</div>
  }

  const {
    name,
    url,
    city,
    country,
    cfpUrl,
    twitter,
    github,
    mastodon,
    cocUrl,
    offersSignLanguageOrCC,
    startDate,
    endDate,
    cfpEndDate,
  } = conference

  return (
    <Page
      htmlTitle='Add a new conference to Confs.tech'
      title='Add a new conference'
      searchEngineTitle='Add a conference to Confs.tech and gain visibility'
      backButton
    >
      <Helmet>
        <script src='https://www.google.com/recaptcha/api.js' async defer />
      </Helmet>

      <div>
        <p>
          Confs.tech is focused on software development conferences and related
          topics, such as product management, UX, and AI.
        </p>
        <p>
          You know a conference on one of these topics? Feel free to submit it
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
          status. Our team will review your request as soon as possible.
        </p>
      </div>

      <div>
        <Card>
          <form onSubmit={handleFormSubmit} autoComplete='off'>
            <InputGroup>
              <div className={styles.Select}>
                <label htmlFor='type'>Language of the conference</label>
                <Select
                  defaultValue={defaultConference.locales.map((value) => ({
                    value,
                    label: LOCALES[value],
                  }))}
                  isMulti
                  placeholder='Select one ore more languages'
                  onChange={(langs) => {
                    setConference({
                      ...conference,
                      locales: langs.map((locale) => locale?.value || ''),
                    })
                  }}
                  options={langOptions}
                  inputId='locales'
                />
                {errorFor('langs', 'You need to select at least one language.')}
              </div>
            </InputGroup>
            <InputGroup>
              <div className={styles.Select}>
                <label htmlFor='type'>Topic</label>
                <Select
                  defaultValue={null}
                  isMulti
                  placeholder='Select one or more topics'
                  onChange={(topics) => {
                    setConference({
                      ...conference,
                      topics: topics.map((topic) => topic?.value || ''),
                    })
                  }}
                  options={topicOptions}
                  inputId='topics'
                />
                {errorFor('topics', 'You need to select at least one topic.')}
              </div>
            </InputGroup>
            {showWarningForTopics(conference.topics) && (
              <Alert>
                We only accept software development related conferences. <br />
                We <strong>do not accept</strong> meetups, company sponsored or
                business events.
              </Alert>
            )}
            {errors['tooManyTopics'] && (
              <p className={styles.errorText}>
                If a conference covers more than 3 topics, please select the
                topic General.
              </p>
            )}
            <InputGroup>
              <div>
                <label htmlFor='name'>Conference name</label>
                <input
                  className={classNames(hasError('name') && styles.error)}
                  type='text'
                  name='name'
                  required
                  autoComplete='off'
                  placeholder='Conference name (without year)'
                  value={name}
                  id='name'
                  onChange={handleFieldChange}
                />
                {errorFor('name', 'Name should not contain year.')}
                {errors['unwantedConference'] && (
                  <p className={styles.errorText}>
                    A part of the conference name or URL has been blocklisted
                    &nbsp;
                    <Link
                      external
                      url='https://github.com/tech-conferences/confs.tech/blob/main/src/scenes/ConferenceForm/utils.ts#L6'
                    >
                      (Details).
                    </Link>
                    Those kind of submissions will not be added to our list.
                    <br />
                    <Link
                      external
                      url='https://github.com/tech-conferences/conference-data/pulls?q=is%3Aunmerged'
                    >
                      See the list of closed and not merged pull requests
                    </Link>
                    <br />
                    This site is focused on conferences related to software
                    development.
                    <br />
                    If you think this is an error, please &nbsp;
                    <Link
                      external
                      url='https://github.com/tech-conferences/conference-data/issues/new'
                    >
                      create an issue on our GitHub repo.
                    </Link>
                  </p>
                )}
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <label htmlFor='url'>URL</label>
                <input
                  className={classNames(hasError('url') && styles.error)}
                  type='url'
                  placeholder='Eg.: https://confs.tech'
                  required
                  value={url}
                  name='url'
                  id='url'
                  onChange={handleFieldChange}
                />
                <div className={styles.InputHint}>
                  Must be valid, up and running and specific for the conference
                </div>
                {errorFor(
                  'url',
                  'Must be a valid URL. No query parameters or URL shorteners are allowed. URL might be blocklisted.'
                )}
              </div>
            </InputGroup>
            <InputGroup inline>
              <div>
                <label htmlFor='startDate'>Start date</label>
                <DatePicker
                  dateFormat={CONFERENCE_DATE_FORMAT}
                  name='startDate'
                  id='startDate'
                  required
                  selected={startDate}
                  onChange={handleStartDateSelect}
                  placeholderText='Eg.: 2021-03-10'
                />
              </div>
              <div>
                <label htmlFor='endDate'>End date</label>
                <DatePicker
                  ref={endDateDatepickerRef}
                  dateFormat={CONFERENCE_DATE_FORMAT}
                  name='endDate'
                  id='endDate'
                  required
                  selected={endDate}
                  onChange={handleDateChange.endDate}
                  placeholderText='Eg.: 2021-03-12'
                />
                {errorFor('endDate', 'End date must be after start date.')}
              </div>
            </InputGroup>
            <InputGroup>
              <label htmlFor='locationType'>Location</label>
              <select
                id='locationType'
                name='locationType'
                value={locationType}
                required
                onChange={handleLocationTypeChange}
              >
                {LOCATION_TYPES.map((locationType) => (
                  <option key={locationType.value} value={locationType.value}>
                    {locationType.name}
                  </option>
                ))}
              </select>
            </InputGroup>{' '}
            {locationType !== 'online' && (
              <InputGroup inline>
                <div>
                  <label htmlFor='city'>City</label>
                  <input
                    className={classNames(hasError('city') && styles.error)}
                    required={locationType !== 'online'}
                    type='text'
                    id='city'
                    name='city'
                    value={city}
                    onChange={handleFieldChange}
                  />
                  {errorFor(
                    'city',
                    'For Online conferences please select location "online"'
                  )}
                </div>
                <div>
                  <label htmlFor='country'>Country</label>
                  <input
                    className={classNames(hasError('country') && styles.error)}
                    required={locationType !== 'online'}
                    type='text'
                    id='country'
                    name='country'
                    value={country}
                    onChange={handleFieldChange}
                  />
                  {errorFor(
                    'country',
                    'For Online conferences please select location "online"'
                  )}
                </div>
              </InputGroup>
            )}
            <InputGroup inline>
              <div>
                <label htmlFor='cfpUrl'>CFP URL</label>
                <input
                  className={classNames(hasError('cfpUrl') && styles.error)}
                  type='url'
                  name='cfpUrl'
                  id='cfpUrl'
                  value={cfpUrl}
                  onChange={handleFieldChange}
                />
                {errorFor(
                  'cfpUrl',
                  'CFP URL must different than URL. No URL query parameters or URL shorteners are allowed.'
                )}
              </div>
              <div>
                <label htmlFor='cfpEndDate'>CFP end date</label>
                <DatePicker
                  dateFormat={CONFERENCE_DATE_FORMAT}
                  name='cfpEndDate'
                  id='cfpEndDate'
                  selected={cfpEndDate}
                  onChange={handleDateChange.cfpEndDate}
                />
                {errorFor(
                  'cfpEndDate',
                  'CFP end date must be before the conference start date.'
                )}
              </div>
            </InputGroup>
            <InputGroup>
              <label htmlFor='twitter'>Conference @TwitterHandle</label>
              <input
                className={classNames(hasError('twitter') && styles.error)}
                type='text'
                name='twitter'
                id='twitter'
                value={twitter}
                onChange={handleFieldChange}
              />
              {errorFor('twitter', 'Should be formatted like @twitter')}
            </InputGroup>
            <InputGroup>
              <label htmlFor='mastodon'>Conference @MastodonHandle</label>
              <input
                className={classNames(hasError('mastodon') && styles.error)}
                type='text'
                name='mastodon'
                id='mastodon'
                value={mastodon}
                onChange={handleFieldChange}
              />
              {errorFor('mastodon', 'Should be formatted like @username@instance')}
            </InputGroup>
            <InputGroup>
              <label htmlFor='cocUrl'>Code Of Conduct URL</label>
              <input
                type='text'
                name='cocUrl'
                id='cocUrl'
                value={cocUrl}
                onChange={handleFieldChange}
              />
            </InputGroup>
            <InputGroup inline>
              <input
                type='checkbox'
                name='offersSignLanguageOrCC'
                id='offersSignLanguageOrCC'
                checked={offersSignLanguageOrCC}
                onChange={handleCheckboxChange}
              />
              <label htmlFor='offersSignLanguageOrCC'>
                This conference offers interpretation to International sign
                language or closed captions.
              </label>
            </InputGroup>
            <InputGroup>
              <Divider />
              <h4>Contact</h4>
              <label htmlFor='github'>Your GitHub username</label>
              <input
                type='text'
                name='github'
                id='github'
                value={github}
                onChange={handleFieldChange}
              />
              <div className={styles.InputHint}>
                In case we need to contact your about your submission.
              </div>
            </InputGroup>
            <Recaptcha
              sitekey='6Lf5FEoUAAAAAJtf3_sCGAAzV221KqRS4lAX9AAs'
              render='explicit'
              verifyCallback={handleVerifyRecaptcha}
              onloadCallback={() => setRecaptchaLoaded(true)}
              theme={darkModeEnabled ? 'dark' : 'light'}
            />
            {serverError ? <ServerError serverError={serverError} /> : null}
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
        </Card>
      </div>
    </Page>
  )
}

export default ConferenceForm
