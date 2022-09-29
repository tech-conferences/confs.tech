import classnames from 'classnames'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Head } from 'src/components'
import { Header, Footer } from 'src/components'
import { Props as HeaderProps } from 'src/components/Header/Header'

import styles from './Page.module.scss'

interface Props {
  children: React.ReactNode
  htmlTitle: string
  noPadding?: boolean
  narrow?: boolean
}

type ComposedProps = Props & HeaderProps

const Page: React.FC<ComposedProps> = ({
  narrow,
  htmlTitle,
  noPadding,
  children,
  ...headerProps
}) => {
  // Scroll to top when changing page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Head />
      <Helmet>
        <title>{htmlTitle}</title>
      </Helmet>

      <Header {...headerProps} />

      <main
        className={classnames({
          [styles.narrow]: narrow,
          [styles.Content]: !noPadding,
        })}
      >
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Page
