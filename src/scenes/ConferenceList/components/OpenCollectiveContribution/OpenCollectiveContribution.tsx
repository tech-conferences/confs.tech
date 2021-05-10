import styles from './OpenCollectiveContribution.module.scss'

const OpenCollectiveContribution = () => {
  return (
    <div className={styles.Container}>
      <a href='https://opencollective.com/confstech/contribute' target='_blank'>
        <img
          src='https://opencollective.com/confstech/contribute/button@2x.png?color=blue'
          width={275}
          alt='Contribute to confs.tech through open collective'
        />
      </a>
    </div>
  )
}

export default OpenCollectiveContribution
