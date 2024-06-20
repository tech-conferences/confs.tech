import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import {
  AboutPage,
  TeamPage,
  NotFoundPage,
  SponsorshipPage,
} from 'src/StaticPages'
import { ConferenceList, ConferenceForm } from 'src/scenes'

import styles from './App.module.scss'
export default function App() {
  return (
    <div className={styles.AppContainer}>
      <div className={styles.App}>
        <Routes>
          <Route path='/pages/:page' element={<Pages />} />
          <Route path='/conferences/new' element={<ConferenceForm />} />
          <Route path='/past' element={<ConferenceList showPast />} />
          <Route
            path='/cfp/:topic/:country'
            element={<ConferenceList showCFP />}
          />
          <Route path='/cfp/:topic/' element={<ConferenceList showCFP />} />
          <Route path='/cfp' element={<ConferenceList showCFP />} />
          <Route path='/:year/:topic/:country' element={<HandleRedirect />} />
          <Route path='/:topic/:country' element={<HandleRedirectOrRender />} />
          <Route path='/:topic' element={<ConferenceList />} />
          <Route path='/' element={<ConferenceList />} />
          <Route element={<ConferenceList />} />
        </Routes>
      </div>
    </div>
  )
}

function Pages() {
  const params = useParams<keyof Params>() as Params

  switch (params.page) {
    case 'about':
      return <AboutPage />
    case 'team':
      return <TeamPage />
    case 'sponsorships':
      return <SponsorshipPage />
  }
  return <NotFoundPage />
}

function HandleRedirect() {
  const { topic, country } = useParams<keyof Params>() as Params

  return <Navigate to={`/${topic}/${country}`} />
}

/*
  Old routes were /:year/:topic and now is /:topic/:country
  If we detect that :topic is a year, the user actually wanted to reach
  the new route /:topic
*/
interface Params {
  page: string
  topic: string
  country: string
}
function HandleRedirectOrRender() {
  const { topic, country } = useParams<keyof Params>() as Params

  if (isYear(topic)) {
    return <Navigate to={`/${country}`} />
  } else {
    return <ConferenceList />
  }
}

function isYear(year?: string) {
  if (!year) {
    return false
  }

  return year.length === 4 && !isNaN(parseInt(year, 10))
}
