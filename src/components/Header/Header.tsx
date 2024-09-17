import { Link, ThemeSwitch, Heading, TwitterFollowButton } from 'src/components'

import styles from './Header.module.scss'

export interface Props {
  searchEngineTitle?: string
  title: string
  subtitle?: string
  backButton?: boolean
}

const Header: React.FC<Props> = ({
  searchEngineTitle,
  title,
  subtitle,
  backButton,
}) => {
  return (
    <header className={styles.Header}>
      <div className={styles.Title}>
        <hgroup>
          <Heading element='h1'>
            <span aria-hidden='true' className='visuallyHidden'>
              {searchEngineTitle || title}
            </span>
            {title}
          </Heading>

          {subtitle && (
            <Heading element='h2' level='sub'>
              {subtitle}
            </Heading>
          )}
        </hgroup>

        {backButton && (
          <Link routed url='/'>
            Back to the conferences
          </Link>
        )}
      </div>
      <div className={styles.Right}>
        <ThemeSwitch />
        <TwitterFollowButton />
      </div>
    </header>
  )
}

export default Header
