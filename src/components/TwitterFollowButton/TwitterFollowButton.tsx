import React from 'react'
import Helmet from 'react-helmet'

const Twitter = () => {
  return (
    <>
      <Helmet>
        <script
          async
          defer
          src='https://platform.twitter.com/widgets.js'
        ></script>
      </Helmet>

      <a
        href='https://twitter.com/ConfsTech'
        data-show-screen-name='false'
        className='twitter-follow-button'
        data-show-count='true'
      >
        Follow @ConfsTech
      </a>
    </>
  )
}

export default Twitter
