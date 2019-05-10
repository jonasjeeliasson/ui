import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { CardWithTabs, Typography } from '../..';

const SpacingInside = styled.div`
  padding-top: ${p => p.theme.spacing.unit(4)}px;
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-bottom: ${p => p.theme.spacing.unit(5)}px;
`;

const Red = styled.div`
  color: red;
`;

storiesOf('Organisms | CardWithTabs', module).
add(
  'with initialActiveTabIndex',
  () => (
    <CardWithTabs
      title={
        <Typography type="title3" as="h2">
          Title for the card
        </Typography>
      }
      initialActiveTabIndex={1}
    >
      <CardWithTabs.Tab title="Tab title 1">
        1
      </CardWithTabs.Tab>
      <CardWithTabs.Tab title="Tab title 2">
        2
      </CardWithTabs.Tab>
    </CardWithTabs>
  ),
).
add(
  'Integration: with Typography and extra space inside',
  () => (
    <CardWithTabs
      title={
        <Typography type="title3" as="h2">
          Title for the card
        </Typography>
      }
    >
      <CardWithTabs.Tab title="Tab title 1">
        <SpacingInside>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum nulla tincidunt
          interdum ornare. Duis blandit nibh nec dui varius lobortis. Sed viverra, metus quis
          vulputate accumsan, eros lacus semper nisl, in commodo risus lacus ut libero. Aliquam
          augue quam, sollicitudin quis lectus quis, viverra gravida nibh. Quisque vel mi non tortor
          sollicitudin sodales id eget odio. Sed mollis eleifend leo, et sagittis mi. Curabitur
          cursus, elit ut porta vehicula, elit ipsum sagittis erat, in dapibus sapien ipsum ut
          purus. Aliquam sit amet egestas lacus. Aenean leo augue, malesuada id nibh ac, malesuada
          fermentum tortor. Vivamus dolor ante, fringilla vel consequat in, hendrerit vel metus.
          Quisque eget ornare turpis. Suspendisse a lectus tortor. Sed ultrices lorem nibh, ultrices
          pulvinar eros dictum sit amet. Quisque et ipsum in tellus pharetra tempus. Morbi non nunc
          rhoncus nisi pellentesque sagittis. Ut eu sem et ante facilisis consequat. Aliquam lorem
          ligula, laoreet quis maximus vel, rhoncus ut odio. Mauris interdum aliquet dolor ac
          efficitur. Maecenas egestas porttitor tempor. In at dui tellus. Praesent at lorem metus.
          Quisque ultricies, nulla sed pulvinar volutpat, libero enim auctor erat, nec consectetur
          purus lacus sed orci. In eleifend a risus at pulvinar. Donec ultricies justo et ligula
          venenatis, sed ultrices nunc dignissim.
        </SpacingInside>
      </CardWithTabs.Tab>
      <CardWithTabs.Tab title={<Red>Custom title component</Red>}>
        <SpacingInside>Some stuff for Tab 2</SpacingInside>
      </CardWithTabs.Tab>
    </CardWithTabs>
  ),
);
