import classNames from 'classnames'
import React from 'react'

import * as styles from './InputGroup.scss'

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
