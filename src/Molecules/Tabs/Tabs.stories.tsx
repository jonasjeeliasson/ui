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
    <Tabs.Container>
      <Tabs.Item title="One">
        <SpacingInside>Ones children</SpacingInside>
      </Tabs.Item>
      <Tabs.Item title="Node as well 👍">
        <SpacingInside>
          Moving focus from a tab will put it on the next <a href="#link">focusable</a> item in the
          tab panel.
        </SpacingInside>
      </Tabs.Item>
    </Tabs.Container>
  </Typography>
));
