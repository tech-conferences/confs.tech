import React from 'react'

import styles from './Card.scss'

const Card: React.FC = ({ children }) => {
  return <div className={styles.Card}>{children}</div>
}
export default Card
