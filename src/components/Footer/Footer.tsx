import { Divider, Link, Twitter } from 'src/components'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

import { TOPICS } from '../config'

import styles from './Footer.module.scss'
const CURRENT_YEAR = new Date().getFullYear()

const Footer = () => {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  return (
    <footer className={styles.Footer}>
      <Divider />
      <HiddenLinks />
      <p className={styles.FooterLinks}>
        <Link url="/conferences/new" routed>
          Add a conference
        </Link>
        <Link routed url="/pages/about">
          About Confs.tech
        </Link>
        <Link routed url="/pages/team">
          Our Team
        </Link>
        <Link routed url="/pages/sponsorships">
          Sponsor
        </Link>
        <Link url="https://github.com/tech-conferences/confs.tech/" external>
          Confs.tech on GitHub
        </Link>
        <Link url="https://twitter.com/ConfsTech/" external>
          Follow us on Twitter
        </Link>
      </p>
      <p className={styles.FooterLinks}>
        <Twitter handle="cgrail" />
        <Twitter handle="katyaprigara" />
        <Twitter handle="nimz_co" />
      </p>
      <p>
        <img
          alt="Sponsor: Search by Algolia"
          src={
            darkModeEnabled
              ? '/search-by-algolia-dark.svg'
              : '/search-by-algolia.svg'
          }
          height="20"
        />
      </p>
    </footer>
  )
}

const HiddenLinks = () => {
  return (
    <div className="visuallyHidden">
      {Object.keys(TOPICS).map((topic) => {
        return (
          <p key={topic}>
            <Link routed url={`/${topic}`}>
              {`${topic} conferences in ${CURRENT_YEAR}`}
            </Link>{' '}
            <Link routed url={`/cfp/${topic}`}>
              {`Open call for papers for ${topic} conferences in ${CURRENT_YEAR}`}
            </Link>
          </p>
        )
      })}
    </div>
  )
}

export default Footer
