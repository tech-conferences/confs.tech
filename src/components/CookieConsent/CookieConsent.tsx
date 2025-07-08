import React, { useState, useEffect } from 'react'

import styles from './CookieConsent.module.scss'

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowBanner(false)
    // Re-load Twitter widget if consent is given
    if (window.twttr) {
      window.twttr.widgets.load()
    }
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    setShowBanner(false)
    // Remove Twitter widget script if declined
    const twitterScript = document.querySelector(
      'script[src*="platform.twitter.com"]',
    )
    if (twitterScript) {
      twitterScript.remove()
    }
  }

  if (!showBanner) return null

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.content}>
        <p>
          This website uses cookies and third-party services (like Twitter) to
          improve your experience. By continuing to use this site, you accept
          our use of cookies.
        </p>
        <div className={styles.buttons}>
          <button onClick={handleAccept} className={styles.acceptButton}>
            Accept
          </button>
          <button onClick={handleDecline} className={styles.declineButton}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
