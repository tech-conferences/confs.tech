import { LOCALES } from 'src/components/config'

export const getLocales = (locales: string) => {
  if (!locales) {
    return 'English'
  }
  return locales
    .split(',')
    .map((locale) => {
      LOCALES[locale]
    })
    .join(', ')
}
