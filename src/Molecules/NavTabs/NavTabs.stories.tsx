import { storiesOf } from '@storybook/react';
import React from 'react';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Tabs from './NavTabs';
import { Typography, NavTabs } from '../../../'

storiesOf('Molecules | NavTabs', module).add('Navtabs', () => (
  <HashRouter>
    <Typography type="secondary">
    <Route exact path="/" render={() => <Redirect to="/transfer" />} />
    <NavTabs.Container>
      <NavTabs.Item title="Not Sweden" to="/transfer">
        Ones children
      </NavTabs.Item>
      <NavTabs.Item title="Sweden" to="/markets">
        Twos children
      </NavTabs.Item>
    </NavTabs.Container>
    </Typography>
    
  </HashRouter>
));

//   markets/sweden
//   markets?country=sweden
//   markets?country=sweden&insturment=hm
