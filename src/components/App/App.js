import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import styles from './App.scss';
import Head from '../Head';
import ConferencePage from '../ConferencePage';

export default function App() {
  return (
    <div className={styles.App}>
      <Head />
      <div>
        <Switch>
          <Route path="/:year/:type/:country" render={redirect} />
          <Route path="/:type/:country" render={redirectOrRender} />
          <Route path="/:type" component={ConferencePage} />
          <Route exact path="/" component={ConferencePage} />
          <Route component={ConferencePage} />
        </Switch>
      </div>
    </div>
  );
}
function redirect(props) {
  const {type, country} = props.match.params;

  return <Redirect to={`/${type}/${country}`} state={{status: 301}} />;
}

/*
  Old routes were /:year/:type and now is /:type/:country
  If we detect that :type is a year, the user actually wanted to reach
  the new route /:type
*/
function redirectOrRender(props) {
  const {type, country} = props.match.params;

  if (isYear(type)) {
    return <Redirect to={`/${country}`} state={{status: 301}} />;
  } else {
    return <ConferencePage {...props} />;
  }

}

function isYear(year) {
  return (year.length === 4 && typeof parseInt(year, 10) === 'number');
}
