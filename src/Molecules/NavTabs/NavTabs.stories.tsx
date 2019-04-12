import { storiesOf } from '@storybook/react';
import React from 'react';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Tabs from './NavTabs';

storiesOf('Molecules | NavTabs', module).add('Navtabs', () => (
  <HashRouter>
    <Route exact path="/" render={() => <Redirect to="/transfer" />} />
    <Tabs.Container>
      <Tabs.Item title="Not Sweden" to="/transfer">
        Ones children
      </Tabs.Item>
      <Tabs.Item title="Sweden" to="/markets">
        Twos children
      </Tabs.Item>
    </Tabs.Container>
  </HashRouter>
));

//   markets/sweden
//   markets?country=sweden
//   markets?country=sweden&insturment=hm
