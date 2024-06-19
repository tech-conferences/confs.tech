import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './InputGroup.module.scss'

interface Props {
  inline?: boolean
  children: ReactNode
}

const InputGroup: React.FC<Props> = ({ children, inline }) => {
  return (
    <div className={classNames(styles.InputGroup, inline && styles.inline)}>
      {children}
    </div>
  )
}

export default InputGroup
