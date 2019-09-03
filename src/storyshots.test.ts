import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';
// eslint-disable-next-line import/no-extraneous-dependencies
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer';
// eslint-disable-next-line import/no-extraneous-dependencies
import { addSerializer } from 'jest-specific-snapshot';

addSerializer(styleSheetSerializer);

// Workaround for https://github.com/facebook/react/issues/11565#issuecomment-3688771492
// @ts-ignore
ReactDOM.createPortal = node => React.createElement('portal-dummy', null, node);

initStoryshots({
  test: multiSnapshotWithOptions({}),
  storyNameRegex: /^(?!(Documentation|Experimental)).*$/,
});
