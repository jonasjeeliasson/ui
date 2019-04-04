import React from 'react';

export type Props = {
  children: React.ReactChild | React.ReactChild[];
  setRef: any;
  selected: boolean;
  index: number;
  onClick: (i: number) => void;
};

export type SeparatorComponent = React.FunctionComponent<Props>;
