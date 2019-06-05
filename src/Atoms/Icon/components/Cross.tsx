import React from 'react';
import { IconBase } from '../IconBase';
import { BaseProps } from '../IconBase.types';

export const Cross = (props: BaseProps) => {
  return (
    <IconBase {...props}>
      <polygon points="15.739 12 24 20.062 19.969 24 12 16.223 4.031 24 0 20.062 8.261 12 0 3.938 4.031 0 12 7.777 19.969 0 24 3.938" />
    </IconBase>
  );
};

Cross.displayName = 'Icon.Cross';
