import { ReactNode } from 'react'

import styles from './Card.module.scss'

interface Props {
  children: ReactNode
}

const Card: React.FC<Props> = ({ children }) => {
  return <div className={styles.Card}>{children}</div>
}
export default Card
