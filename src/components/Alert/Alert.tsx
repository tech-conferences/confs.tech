import { ReactNode } from 'react'

import styles from './Alert.module.scss'

interface Props {
  children: ReactNode
}

const Alert: React.FC<Props> = ({ children }) => {
  return (
    <p className={styles.warning}>
      <span aria-hidden>
        <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ReportProblemOutlinedIcon"
        >
          <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
        </svg>
      </span>{' '}
      <span>{children}</span>
    </p>
  )
}

export default Alert
