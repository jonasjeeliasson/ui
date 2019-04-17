import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { StatefulTabs, Typography } from '../../index';
// import Separator from '.Atoms/Separator';

const SpacingInside = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

storiesOf('Molecules | Tabs', module).add('Default (extra space inside)', () => (
  <Typography type="secondary">
    <StatefulTabs.Container>
      <StatefulTabs.Item title="One">
        <SpacingInside>Ones children</SpacingInside>
      </StatefulTabs.Item>
      <StatefulTabs.Item
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
          Moving focus from a tab will put it on the next <a href="#link">focusable</a> item in the
          tab panel.
        </SpacingInside>
      </StatefulTabs.Item>
    </StatefulTabs.Container>
  </Typography>
));
