import classNames from 'classnames'

import styles from './InputGroup.module.scss'

interface Props {
  inline?: boolean
}

const InputGroup: React.FC<Props> = ({ children, inline }) => {
  return (
    <div className={classNames(styles.InputGroup, inline && styles.inline)}>
      {children}
    </div>
  )
}

export default InputGroup
