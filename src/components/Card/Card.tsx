import styles from './Card.module.scss'

const Card: React.FC = ({ children }) => {
  return <div className={styles.Card}>{children}</div>
}
export default Card
