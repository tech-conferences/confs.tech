import { Link, Heading } from 'src/components'

import styles from './CFPHeader.module.scss'

interface Props {
  sortByCfpEndDate(): void
  sortBy: string
}

const CfpHeader = ({ sortByCfpEndDate, sortBy }: Props) => {
  return (
    <div className={styles.CFPHeader}>
      <Heading element='h2' level={2}>
        Call for Papers
      </Heading>
      <div>
        <span role='img' aria-label='Sorted by' title='Sorted by'>
          ↕️
        </span>
        <Link
          className={sortBy === 'startDate' ? styles.active : ''}
          button
          onClick={sortByCfpEndDate}
        >
          Conference start date
        </Link>
        {' / '}
        <Link
          className={sortBy === 'startDate' ? '' : styles.active}
          button
          onClick={sortByCfpEndDate}
        >
          CFP end date
        </Link>
      </div>
    </div>
  )
}

export default CfpHeader
