import classnames from 'classnames'
import { Helmet } from 'react-helmet'
import { Head } from 'src/components'
import { Header, Footer } from 'src/components'
import { Props as HeaderProps } from 'src/components/Header/Header'

import styles from './Page.module.scss'

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

      <main className={classnames({ [styles.Content]: narrow })}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Page
