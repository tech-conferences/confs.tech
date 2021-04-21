import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { AboutPage, NotFoundPage } from 'src/StaticPages'
import { ConferenceList, ConferenceForm } from 'src/scenes'

import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.AppContainer}>
      <div className={styles.App}>
        <Switch>
          <Route path='/pages/:page' component={renderPages} />
          <Route path='/conferences/new' component={ConferenceForm} />
          <Route path='/past' render={renderPast} />
          <Route path='/cfp/:topic/:country' render={renderCFP} />
          <Route path='/cfp/:topic/' render={renderCFP} />
          <Route path='/cfp' render={renderCFP} />
          <Route path='/:year/:topic/:country' render={redirect} />
          <Route path='/:topic/:country' render={redirectOrRender} />
          <Route path='/:topic' component={ConferenceList} />
          <Route exact path='/' component={ConferenceList} />
          <Route component={ConferenceList} />
        </Switch>
      </div>
    </div>
  )
}
function renderCFP() {
  return <ConferenceList showCFP />
}

function renderPast() {
  return <ConferenceList showPast />
}

function renderPages({ match }: RouteComponentProps<{ page: string }>) {
  switch (match.params.page) {
    case 'about':
      return <AboutPage />
  }
  return <NotFoundPage />
}

function redirect(
  props: RouteComponentProps<{ topic: string; country: string }>
) {
  const { topic, country } = props.match.params

  return <Redirect to={`/${topic}/${country}`} />
}

/*
  Old routes were /:year/:topic and now is /:topic/:country
  If we detect that :topic is a year, the user actually wanted to reach
  the new route /:topic
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function redirectOrRender(props: any) {
  const { topic, country } = props.match.params

  if (isYear(topic)) {
    return <Redirect to={`/${country}`} />
  } else {
    return <ConferenceList {...props} fallback={redirectToTopic} />
  }
}

function isYear(year: string) {
  return year.length === 4 && !isNaN(parseInt(year, 10))
}

function redirectToTopic(topic: string) {
  return <Redirect to={`/${topic}`} />
}
