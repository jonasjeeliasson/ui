import React from 'react';
import { Props as NumberProps } from '../../Molecules/Number/Number.types';

export type DevelopmentProps = {
  value: number | null | undefined;
  /** @default false */
  icon?: boolean;
  className?: string;
};

export type DevelopmentComponent = React.FC<DevelopmentProps & NumberProps>;
