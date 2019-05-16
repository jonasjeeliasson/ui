import React from 'react';
import { IconBase } from '../IconBase';
import { BaseProps } from '../IconBase.types';

export const Trash = (props: BaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M14.7,5.2173913 L6.3,5.2173913 L2.1,5.2173913 L2.1,7.30434783 L18.9,7.30434783 L18.9,5.2173913 L14.7,5.2173913 Z M12.6,3.13043478 L12.6,2.08695652 L8.4,2.08695652 L8.4,3.13043478 L12.6,3.13043478 Z M6.3,3.13043478 L6.3,0 L14.7,0 L14.7,3.13043478 L21,3.13043478 L21,9.39130435 L18.9,9.39130435 L18.9,24 L2.1,24 L2.1,9.39130435 L0,9.39130435 L0,3.13043478 L6.3,3.13043478 Z M4.2,9.39130435 L4.2,21.9130435 L16.8,21.9130435 L16.8,9.39130435 L4.2,9.39130435 Z M6.3,11.4782609 L8.4,11.4782609 L8.4,19.826087 L6.3,19.826087 L6.3,11.4782609 Z M9.45,11.4782609 L11.55,11.4782609 L11.55,19.826087 L9.45,19.826087 L9.45,11.4782609 Z M12.6,11.4782609 L14.7,11.4782609 L14.7,19.826087 L12.6,19.826087 L12.6,11.4782609 Z" />
    </IconBase>
  );
};

Trash.displayName = 'Icon.Trash';
