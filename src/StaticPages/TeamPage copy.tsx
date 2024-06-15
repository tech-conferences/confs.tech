import { Divider, Link, Page } from "src/components";
import {
  Maintainers,
  maintainersData,
  contributors,
} from "src/data/maintainersData";

import { Github, Linkedin, Mastodon, Site, TwitterX } from "src/icons/icons";

import styles from "./TeamPage.module.scss";

export default function TeamPage() {
  const getFourthIcon = (fourthTxt: string) => {
    switch (fourthTxt) {
      case "Site":
        return <Site />;
      case "Mastodon":
        return <Mastodon />;
      default:
        return <Site />;
    }
  };

  const fetchContributors = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/tech-conferences/conference-data/contributors"
      );
      if (response.ok) {
        const contributors = await response.json();
        console.log(contributors);
      }
    } catch (error) {
      console.error(
        "Failed to fetch contributors data from GitHub API:",
        error
      );
    }
  };

  return (
    <Page
      narrow
      title="Team Confs.tech"
      subtitle="Meet the team behind Confs.tech"
      htmlTitle="Team Confs.tech open source project"
      backButton
    >
      <p>
        Meet Our Team, Passionate About Open Source and Making Conf.tech
        possible.
      </p>
      {/* <section className={styles.Team}>
        {Maintainers.map((maintainer, id) => (
          <div key={id} className={styles.TeamMember}>
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
                  {getFourthIcon(maintainer.fourthTxt)}
                </span>
                {maintainer.fourthTxt}
              </Link>
            </div>
          </div>
        ))}
      </section> */}
      <Divider />
      <h2>Meet the team</h2>
      <p>Contribute to Confs.tech and support the developer community.</p>
      <Divider />
      <p>Fetch GitHub API to display contributors</p>
      <button onClick={fetchContributors}>Fetch Contributors</button>
      <Divider />

      <h3>How do I join the team?</h3>
      <p>
        We are always looking for new contributors to help us improve
        Confs.tech. If you are interested in joining the team, please check out
        our GitHub repository and get in touch with us.
      </p>
      <Link external url="https://github.com/tech-conferences/conference-data">
        Join our awesome team!
      </Link>
    </Page>
  );
}
