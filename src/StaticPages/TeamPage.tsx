import { Divider, Link, Page } from "src/components";
import {
  // maintainersData,
  Maintainers,
  // Contributor,
  // MaintainersDataInterface,
} from "src/data/maintainersData";
import { Community, Github, Linkedin, TwitterX } from "src/icons/icons";

import styles from "./TeamPage.module.scss";

export default function TeamPage() {
  return (
    <Page
      narrow
      title="Team Confs.tech"
      htmlTitle="Team Confs.tech open source project"
      backButton
    >
      <p>
        Meet Our Team, Passionate About Open Source and Making Conf.tech
        possible.
      </p>

      <Divider />

      <section className={styles.Team}>
        {Maintainers.map((maintainer, id) => (
          <div key={id} className={styles.TeamMember}>
            <h2>{maintainer.name}</h2>
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
                  <Community />
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
                  <Linkedin />
                </span>
                {maintainer.fourthTxt}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Page>
  );
}
