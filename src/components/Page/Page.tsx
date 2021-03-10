import classnames from 'classnames'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Head } from 'src/components'
import { Header, HeaderProps, Footer } from 'src/components'

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
  return (
    <div>
      <Head />
      <Helmet>
        <title>{htmlTitle}</title>
      </Helmet>

      <Header {...headerProps} />

      <div className={classnames({ [styles.Content]: narrow })}>{children}</div>

      <Footer />
    </div>
  )
}

export default Page
