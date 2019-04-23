import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Tabs, Typography } from '../..';

const SpacingInside = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

storiesOf('Molecules | Tabs', module).add('Default (extra space inside)', () => (
  <Typography type="secondary">
    <Tabs>
      <Tabs.Tab title="One">
        <SpacingInside>Ones children</SpacingInside>
      </Tabs.Tab>
      <Tabs.Tab
        title={
          <div>
            Node as well
            <span role="img" aria-label="goodjob">
              👍
            </span>
          </div>
        }
      >
        <SpacingInside>
          Moving focus from a tab will put it on the next <a href="#link">focusable</a> Tab in the
          tab panel.
        </SpacingInside>
      </Tabs.Tab>
    </Tabs>
  </Typography>
));
