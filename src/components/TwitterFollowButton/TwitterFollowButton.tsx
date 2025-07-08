import { useEffect, useState } from 'react'
import Helmet from 'react-helmet'

declare global {
  interface Window {
    twttr: {
      widgets: {
        load(): void
      }
    }
  }
}

const Twitter = () => {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check if user has consented to cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent === 'true') {
      setHasConsent(true)
    }
  }, [])

  useEffect(() => {
    if (hasConsent && window.twttr) {
      window.twttr.widgets.load()
    }
  }, [hasConsent])

  // If no consent, show a simple follow link without embedded widget
  if (!hasConsent) {
    return (
      <a
        href='https://twitter.com/ConfsTech'
        target='_blank'
        rel='noopener noreferrer'
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#1da1f2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        Follow @ConfsTech
      </a>
    )
  }

  return (
    <>
      <Helmet>
        <script
          async
          defer
          src='https://platform.twitter.com/widgets.js'
          data-cookieconsent='ignore'
        ></script>
      </Helmet>

      <a
        href='https://twitter.com/ConfsTech'
        data-show-screen-name='false'
        className='twitter-follow-button'
        data-show-count='true'
        data-dnt='true'
      >
        Follow @ConfsTech
      </a>
    </>
  )
}

export default Twitter
