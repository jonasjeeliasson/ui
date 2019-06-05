import React from 'react';
import { storiesOf } from '@storybook/react';
import { PageHeaderCard, Flexbox, Button, Box } from '../..';

storiesOf('Molecules | PageHeader', module)
  .add('Regular page header', () => <PageHeaderCard title="Your darkest loaves" />)
  .add('Page header with children', () => (
    <PageHeaderCard title="Your darkest loaves">
      <Box py={2} sm={{ py: 0 }}>
        <Flexbox container gutter={2} alignItems="center" justifyContent="space-between">
          <Flexbox item>The eternal techlead, The portugese friend</Flexbox>
          <Flexbox item>
            <Button>Click here to recruit carl</Button>
          </Flexbox>
        </Flexbox>
      </Box>
    </PageHeaderCard>
  ));
