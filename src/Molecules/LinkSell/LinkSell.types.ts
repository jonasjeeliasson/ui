import React from 'react';
import { LinkProps } from '../Link/Link.types';

export type Props = {
  as?: string;
};

export type LinkSellComponent = React.FunctionComponent<LinkProps & Props>;
