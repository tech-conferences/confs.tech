import React, { useCallback } from 'react'
import useLocalStorage from 'src/hooks/useLocalStorage'

export interface DarkModeContextProps {
  values: {
    darkModeEnabled?: boolean
  }
  actions: {
    toggleDarkMode?(): void
  }
}

const DarkModeContext = React.createContext<DarkModeContextProps>({
  values: {},
  actions: {},
})

export const DarkModeContextProvider: React.FC = ({ children }) => {
  let systemDarkMode = false
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    systemDarkMode = true
  }

  const [darkModeEnabled, setDarkModeEnabled] = useLocalStorage(
    'darkModeEnabled',
    systemDarkMode
  )
  const toggleDarkMode = useCallback(() => {
    setDarkModeEnabled(!darkModeEnabled)
  }, [setDarkModeEnabled, darkModeEnabled])

  const value = React.useMemo(
    () => ({
      actions: { toggleDarkMode },
      values: {
        darkModeEnabled,
      },
    }),
    [darkModeEnabled, toggleDarkMode]
  )

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkModeContext = () => React.useContext(DarkModeContext)
