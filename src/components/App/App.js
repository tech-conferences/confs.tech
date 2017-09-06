import React from 'react';
import {Switch, Route} from 'react-router-dom';

import styles from './App.scss';
import Head from '../Head';
import Footer from '../Footer';
import ConferencePage from '../ConferencePage';

export default function App() {
  return (
    <div className={styles.App}>
      <Head />
      <div>
        <Switch>
          <Route path="/:year/:type/:country" component={ConferencePage} />
          <Route path="/:year/:type" component={ConferencePage} />
          <Route path="/:type" component={ConferencePage} />
          <Route exact path="/" component={ConferencePage} />
          <Route component={ConferencePage} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
