import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Typography, CollapsibleCard } from '../..';

const styledText = styled.p`
  margin: 0;
`;

storiesOf('Molecules | CollapsibleCard', module)
  .add('Default', () => {
    return (
      <CollapsibleCard title="Collapsible">
        <Typography type="primary" as={styledText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </CollapsibleCard>
    );
  })
  .add('Collapsed initially', () => {
    return (
      <CollapsibleCard title="Collapsed initially" collapsedInitial>
        <Typography type="primary" as={styledText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </CollapsibleCard>
    );
  })
  .add('Collapsible with custom component as title', () => {
    return (
      <CollapsibleCard title={<div>Custom title</div>}>
        <Typography type="primary" as={styledText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </CollapsibleCard>
    );
  });
