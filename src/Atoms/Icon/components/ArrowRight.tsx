import React from 'react';
import { IconBase } from '../IconBase';
import { BaseProps } from '../IconBase.types';

export const ArrowRight = (props: BaseProps) => {
  return (
    <IconBase {...props}>
      <polygon points="16.278 14 0 14 0 10 16.278 10 8.211 2 13.916 2 24 12 21.148 14.828 13.916 22 8.211 22" />
    </IconBase>
  );
};

ArrowRight.displayName = 'Icon.ArrowRight';
