import React from 'react';

export type BaseProps = {
  value: number;
  currency: string;
  sign?: boolean;
};

export type CurrencyComponent = React.ComponentClass<BaseProps>;
