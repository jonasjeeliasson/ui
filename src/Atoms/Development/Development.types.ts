import React from 'react';

export type DevelopmentProps = {
  value: number;
  className?: string;
};

export type DevelopmentComponent = {
  Primary: React.FC<DevelopmentProps>;
  Secondary: React.FC<DevelopmentProps>;
  Tertiary: React.FC<DevelopmentProps>;
};
