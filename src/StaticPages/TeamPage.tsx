import { useEffect, useState } from 'react'
import { Divider, Link, Page } from 'src/components'
import { Maintainers, Contributor } from 'src/data/maintainersData'
import { Github, Linkedin, Mastodon, Site, TwitterX } from 'src/icons/icons'

import styles from './TeamPage.module.scss'

export default function TeamPage() {
  const [confsTechContributors, setConfsTechContributors] = useState<
    Contributor[]
  >([])
  const [conferenceDataContributors, setConferenceDataContributors] = useState<
    Contributor[]
  >([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributors = async (
      url: string,
      setContributorsState: (contributorNames: Contributor[]) => void,
    ) => {
      try {
        const response = await fetch(url)
        if (response.status === 429 || response.status === 403) {
          setError('Too Many Requests, try again later')
          return
        }
        if (response.ok) {
          const contributors = await response.json()

          // Fetch additional data for each contributor
          const contributorsWithNames: Contributor[] = await Promise.all(
            contributors.map(async (contributor: Contributor) => {
              const userResponse = await fetch(
                `https://api.github.com/users/${contributor.login}`,
              )
              if (userResponse.ok) {
                const userData = await userResponse.json()
                return { ...contributor, name: userData.name }
              }
              return contributor
            }),
          )

          setContributorsState(contributorsWithNames)
        }
      } catch (error) {
        console.error(
          'Failed to fetch contributors data from GitHub API:',
          error,
        )
      }
    }

    fetchContributors(
      'https://api.github.com/repos/tech-conferences/confs.tech/contributors',
      setConfsTechContributors,
    )
    fetchContributors(
      'https://api.github.com/repos/tech-conferences/conference-data/contributors',
      setConferenceDataContributors,
    )
  }, [])

  function capitalizeFirstLetter(string: string): string {
    let result = string
      .split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Truncate the result to 20 characters if necessary
    if (result.length > 20) {
      result = result.substring(0, 20)
    }

    return result
  }

  interface TeamSectionProps {
    contributors: Contributor[]
    contributionsUrlBase: string
  }
  const TeamSection = ({
    contributors,
    contributionsUrlBase,
  }: TeamSectionProps) => (
    <section className={styles.team}>
      {contributors.map((contributor) => {
        const name = capitalizeFirstLetter(
          contributor.name || contributor.login,
        )
        return (
          <div key={contributor.id} className={styles.teamMember}>
            <h3>{name}</h3>
            <div className={styles.avatar}>
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className={styles.avatarImg}
              />
            </div>
            <p className={styles.githubUsername}>@{contributor.login}</p>
            <div className={styles.links}>
              <Link url={contributor.html_url} className={styles.link_item}>
                <Github />
                <span>GitHub</span>
              </Link>
              <Link
                url={`${contributionsUrlBase}/commits?author=${contributor.login}`}
                className={styles.link_item}
              >
                <div className={styles.contributionContainer}>
                  {contributor.contributions}
                  <span className={styles.contribution}>Contributions</span>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </section>
  )

  const dynamic_icon = (fourthTxt: string) => {
    switch (fourthTxt) {
      case 'Website':
        return <Site />
      case 'Mastodon':
        return <Mastodon />
      default:
        return null
    }
  }

  return (
    <Page
      title='Team Confs.tech'
      subtitle='Meet the team behind Confs.tech'
      htmlTitle='Team Confs.tech open source project'
      backButton
    >
      <p>
        Meet Our Team, Passionate About Open Source and Making Conf.tech
        possible.
      </p>
      <section className={styles.team}>
        {Maintainers.map((maintainer, id) => (
          <div key={id} className={styles.teamMember}>
            <h3>{maintainer.name}</h3>
            <div className={styles.avatar}>
              <img
                src={maintainer.avatarUrl}
                alt={maintainer.name}
                className={styles.avatarImg}
              />
            </div>
            <p className={styles.designation}>{maintainer.designation}</p>
            <p className={styles.role}>{maintainer.role}</p>
            <div className={styles.links}>
              <Link url={maintainer.firstLink}>
                <span className={styles.icon}>
                  <Github />
                </span>
                {maintainer.firstTxt}
              </Link>
              <Link url={maintainer.secondLink}>
                <span className={styles.icon}>
                  <Linkedin />
                </span>
                {maintainer.secondTxt}
              </Link>
              <Link url={maintainer.thirdLink}>
                <span className={styles.icon}>
                  <TwitterX />
                </span>
                {maintainer.thirdTxt}
              </Link>
              <Link url={maintainer.fourthLink}>
                <span className={styles.icon}>
                  {dynamic_icon(maintainer.fourthTxt)}
                </span>
                {maintainer.fourthTxt}
              </Link>
            </div>
          </div>
        ))}
      </section>
      <Divider />
      <h3>How do I join the team?</h3>
      <p>
        We are always looking for new contributors to help us improve
        Confs.tech. If you are interested in joining the team, please check out
        our GitHub repository and get in touch with us.
      </p>
      <Link external url='https://github.com/tech-conferences/conference-data'>
        Join our awesome team!
      </Link>
      {error ? (
        <>
          {/* <Divider />
          <h2>{error}</h2>
          <p>Too many requests, try again later</p> */}
        </>
      ) : (
        <section>
          <Divider />
          <h2>Meet the rest of the team</h2>
          <p>Contribute to Confs.tech and support the developer community.</p>
          <>
            <h3>Confs.tech contributors</h3>
            <TeamSection
              contributors={confsTechContributors}
              contributionsUrlBase='https://github.com/tech-conferences/confs.tech'
            />

            <div className={styles.repo}>
              <h3>Conference Data contributors</h3>
              <TeamSection
                contributors={conferenceDataContributors}
                contributionsUrlBase='https://github.com/tech-conferences/conference-data'
              />
            </div>
          </>
        </section>
      )}
    </Page>
  )
}
