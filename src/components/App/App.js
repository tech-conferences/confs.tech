import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import styles from './App.scss';
import Head from '../Head';
import ConferencePage from '../ConferencePage';
import ConferenceNewPage from '../ConferenceNewPage';

export default function App() {
  return (
    <div className={styles.App}>
      <Head />
      <div>
        <Switch>
          <Route path="/conferences/new" component={ConferenceNewPage} />
          <Route path="/cfp/:topic/:country" render={renderCFP} />
          <Route path="/cfp/:topic/" render={renderCFP} />
          <Route path="/cfp" render={renderCFP} />
          <Route path="/:year/:topic/:country" render={redirect} />
          <Route path="/:topic/:country" render={redirectOrRender} />
          <Route path="/:topic" component={ConferencePage} />
          <Route exact path="/" component={ConferencePage} />
          <Route component={ConferencePage} />
        </Switch>
      </div>
    </div>
  );
}
function renderCFP({match}) {
  return <ConferencePage match={match} showCFP />;
}

function redirect(props) {
  const {topic, country} = props.match.params;

  return <Redirect to={`/${topic}/${country}`} state={{status: 301}} />;
}

/*
  Old routes were /:year/:topic and now is /:topic/:country
  If we detect that :topic is a year, the user actually wanted to reach
  the new route /:topic
*/
function redirectOrRender(props) {
  const {topic, country} = props.match.params;

  if (isYear(topic)) {
    return <Redirect to={`/${country}`} state={{status: 301}} />;
  } else {
    return <ConferencePage {...props} fallback={redirectToTopic} />;
  }
}

function isYear(year) {
  return (year.length === 4 && !isNaN(parseInt(year, 10)));
}

function redirectToTopic(topic) {
  return <Redirect to={`/${topic}`} state={{status: 301}} />;
}
