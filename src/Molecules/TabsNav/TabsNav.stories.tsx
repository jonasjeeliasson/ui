import { storiesOf } from '@storybook/react';
import React from 'react';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { Typography, TabsNav, Separator, Flexbox, Box } from '../..';

storiesOf('Molecules | TabsNav', module)
  .add('Integration: With react-router', () => (
    <HashRouter>
      <Flexbox container direction="column" gutter={0}>
        <Flexbox item>
          <Typography type="secondary">
            <TabsNav>
              <TabsNav.Tab
                title="Link to /route1"
                to="/route1"
                onTitleClick={action('Clicked title1')}
              />
              <TabsNav.Tab
                title={<div>Link to /route2</div>}
                to="/route2"
                onTitleClick={action('Clicked title2')}
              />
            </TabsNav>
          </Typography>
        </Flexbox>
        <Flexbox item>
          <Separator />
        </Flexbox>
        <Flexbox item>
          <Box py={4}>
            <Route path="/route1" component={() => <>/route1 content</>} />
            <Route path="/route2" component={() => <>/route2 content</>} />
            <Route exact path="/" render={() => <Redirect to="/route1" />} />
          </Box>
        </Flexbox>
      </Flexbox>
    </HashRouter>
  ))
  .add('Integration: With react-router size M', () => (
    <HashRouter>
      <Flexbox container direction="column" gutter={0}>
        <Flexbox item>
          <Typography type="secondary">
            <TabsNav size="m">
              <TabsNav.Tab
                title="Link to /route1"
                to="/route1"
                onTitleClick={action('Clicked title1')}
              />
              <TabsNav.Tab
                title={<div>Link to /route2</div>}
                to="/route2"
                onTitleClick={action('Clicked title2')}
              />
            </TabsNav>
          </Typography>
        </Flexbox>
        <Flexbox item>
          <Separator />
        </Flexbox>
        <Flexbox item>
          <Box py={4}>
            <Route path="/route1" component={() => <>/route1 content</>} />
            <Route path="/route2" component={() => <>/route2 content</>} />
            <Route exact path="/" render={() => <Redirect to="/route1" />} />
          </Box>
        </Flexbox>
      </Flexbox>
    </HashRouter>
  ));
