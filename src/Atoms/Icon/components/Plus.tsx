import React from 'react';
import { IconBase } from '../IconBase';
import { BaseProps } from '../IconBase.types';

export const Plus = (props: BaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M13 0v11h11v2H13v11h-2V12.999L0 13v-2l11-.001V0h2z" fillRule="evenodd" />
    </IconBase>
  );
};

Plus.displayName = 'Icon.Plus';
