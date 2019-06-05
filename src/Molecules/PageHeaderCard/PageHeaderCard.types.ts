import React from 'react';

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

export type PageHeaderCardComponent = React.FunctionComponent<Props>;
