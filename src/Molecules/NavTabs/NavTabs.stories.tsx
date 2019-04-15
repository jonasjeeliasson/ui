import { storiesOf } from '@storybook/react';
import React from 'react';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, NavTabs } from '../..';

const SpacingInside = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

storiesOf('Molecules | NavTabs', module).add('Default (extra space inside)', () => (
  <HashRouter>
    <Typography type="secondary">
      <Route exact path="/" render={() => <Redirect to="/transfer" />} />
      <NavTabs.Container>
        <NavTabs.Item title="Not Sweden" to="/transfer">
          <SpacingInside>Ones children</SpacingInside>
        </NavTabs.Item>
        <NavTabs.Item title="Sweden" to="/markets">
          <SpacingInside>Twos children</SpacingInside>
        </NavTabs.Item>
      </NavTabs.Container>
    </Typography>
  </HashRouter>
));
