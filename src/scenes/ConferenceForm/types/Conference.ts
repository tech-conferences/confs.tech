export interface Conference {
  name: string
  url: string
  city: string
  country: string
  online: boolean
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  topics: string[]
  locales: string[]
  cfpUrl: string
  cfpEndDate: Date | null | undefined
  twitter: string
  github: string
  mastodon: string
  cocUrl: string
  offersSignLanguageOrCC: boolean
}
