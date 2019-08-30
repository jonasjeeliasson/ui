import React from 'react';
import { IconBase } from '../IconBase';
import { BaseProps } from '../IconBase.types';

export const Minus = (props: BaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M24 11v2H0v-2z" fillRule="evenodd" />
    </IconBase>
  );
};

Minus.displayName = 'Icon.Minus';
