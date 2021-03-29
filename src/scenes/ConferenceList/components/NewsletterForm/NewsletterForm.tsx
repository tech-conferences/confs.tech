import classNames from 'classnames'
import React, { PureComponent, ComponentType } from 'react'
import { Heading } from 'src/components'

import styles from './NewsletterForm.module.scss'

interface Props {
  topic: string
}

interface State {
  gdprChecked: boolean
}
type ComposedProps = Props

class NewsletterForm extends PureComponent<ComposedProps, State> {
  state: State = {
    gdprChecked: false,
  }

  render() {
    const { topic } = this.props
    const { gdprChecked } = this.state
    return (
      <div className={classNames(styles.NewsletterForm)}>
        <Heading element='h4' level={4}>
          Stay tuned!
        </Heading>
        <form
          action='https://tech.us19.list-manage.com/subscribe/post?u=246492d8cf0efc8c4ec6a9a60&amp;id=84b8d4723e'
          method='post'
          id='mc-embedded-subscribe-form'
          name='mc-embedded-subscribe-form'
          target='_blank'
          noValidate
          className={styles.Content}
        >
          <div className={styles.FormFirstLine}>
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden='true'
            >
              <input
                type='text'
                name='b_246492d8cf0efc8c4ec6a9a60_84b8d4723e'
                tabIndex={-1}
                value={topic}
              />
            </div>
            <input
              type='email'
              name='EMAIL'
              className={styles.EmailInput}
              id='mce-EMAIL'
              placeholder='Email'
            />
            <div>
              <input
                disabled={!gdprChecked}
                type='submit'
                value='Subscribe'
                name='subscribe'
                id='mc-embedded-subscribe'
                className={styles.Button}
              />
            </div>
          </div>
          <div className={styles.GDPR}>
            <input
              onChange={this.handleGdprChange}
              checked={gdprChecked}
              type='checkbox'
              id='gdpr_18847'
              name='gdpr[18847]'
              value='Y'
              className='av-checkbox'
            />
            <label htmlFor='gdpr_18847'>
              I accept to receive emails – GDPR&nbsp;
              <span role='img' aria-label='checked'>
                ✅
              </span>
            </label>
          </div>
        </form>
      </div>
    )
  }

  private handleGdprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      gdprChecked: event.currentTarget.checked,
    })
  }
}

export default NewsletterForm as ComponentType<Props>
