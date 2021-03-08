import * as React from 'react'

import useLocalStorage from 'src/hooks/useLocalStorage'

export interface DarkModeContextProps {
  values: {
    darkModeEnabled?: boolean
  }
  actions: {
    setDarkModeEnabled?(val: boolean): void
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

  const value = React.useMemo(
    () => ({
      actions: { setDarkModeEnabled },
      values: {
        darkModeEnabled,
      },
    }),
    [darkModeEnabled, setDarkModeEnabled]
  )

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkModeContext = () => React.useContext(DarkModeContext)
