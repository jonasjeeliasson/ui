import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Typography, NavTabs } from '../..';

const SpacingInside = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

storiesOf('Molecules | NavTabs', module).add('Integration: Extra space inside', () => (
  <HashRouter>
    <Typography type="secondary">
      <NavTabs.Container>
        <NavTabs.Item title="Link to /route1" to="/route1" />
        <NavTabs.Item title="Link to /route2" to="/route2" />
      </NavTabs.Container>
    </Typography>
    <SpacingInside>
      <Route path="/route1" component={() => <>/route1 content</>} />
      <Route path="/route2" component={() => <>/route2 content</>} />
      <Route exact path="/" render={() => <Redirect to="/route1" />} />
    </SpacingInside>
  </HashRouter>
));
