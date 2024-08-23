import { Link } from 'src/components'

import { ServerErrorEnum } from '../ConferenceForm'
import styles from '../ConferenceForm.module.scss'

interface ServerErrorProps {
  serverError: ServerErrorEnum
}
const ServerError = ({ serverError }: ServerErrorProps) => {
  switch (serverError) {
    case ServerErrorEnum.AlreadyExists:
      return (
        <p className={styles.errorText}>
          This conference has already been added.
          <br />
          If you don't find it on{' '}
          <Link external url='https://confs.tech'>
            Confs.tech
          </Link>{' '}
          <Link
            external
            url='https://github.com/tech-conferences/conference-data/issues/new'
          >
            create an issue on our GitHub repo.
          </Link>
        </p>
      )
    case ServerErrorEnum.Generic:
      return (
        <p className={styles.errorText}>
          An error happened from the server.
          <br />
          If it still happens, you can&nbsp;
          <Link
            external
            url='https://github.com/tech-conferences/conference-data/issues/new'
          >
            create an issue on our GitHub repo.
          </Link>
        </p>
      )
  }

  return null
}

export default ServerError
