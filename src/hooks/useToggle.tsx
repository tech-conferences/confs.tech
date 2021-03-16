import { useState } from 'react'

export default (
  defaultValue: boolean
): [boolean, () => void, (value: boolean) => void] => {
  const [toggleState, setToggleState] = useState(defaultValue)
  const setToggleHandler = () => setToggleState(!toggleState)

  return [toggleState, setToggleHandler, setToggleState]
}
