import classnames from 'classnames'
import React from 'react'
import Favicon from 'react-favicon'
import { Helmet } from 'react-helmet'
import { Header, HeaderProps, Footer } from 'src/components'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import styles from './Page.scss'

interface Props {
  children: React.ReactNode
  htmlTitle: string
  narrow?: boolean
}

type ComposedProps = Props & HeaderProps

const Page: React.FC<ComposedProps> = ({
  narrow,
  htmlTitle,
  children,
  ...headerProps
}) => {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  return (
    <div>
      <Helmet>
        <title>{htmlTitle}</title>
      </Helmet>

      <Favicon url={darkModeEnabled ? 'favicon-dark.png' : 'favicon.png'} />

      <Header {...headerProps} />

      <div className={classnames({ [styles.Content]: narrow })}>{children}</div>

      <Footer />
    </div>
  )
}

export default Page
