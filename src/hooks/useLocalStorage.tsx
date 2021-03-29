import { useState } from 'react'

interface LocalStorageState {
  darkModeEnabled: boolean
}

interface UseLocalStorageI {
  <K extends keyof LocalStorageState>(
    key: K,
    initialValue: LocalStorageState[K]
  ): [LocalStorageState[K], (v: LocalStorageState[K]) => void]
}

/**
 * Persist state in the browser localStorage
 * To persist a new state in the localStorage, make sure to add types to the types/LocalStorageState
 *
 * For future use: https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
 * Taken from https://usehooks.com/useLocalStorage/
 *
 * @param key
 * @param initialValue
 */
const useLocalStorage: UseLocalStorageI = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
