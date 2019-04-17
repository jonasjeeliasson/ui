import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { CurrencyComponent, BaseProps } from './Currency.types';

const getPrefix = (value: number, sign?: boolean) => {
  if (sign && value > 0) {
    return '+';
  }

  return '';
};
const FormattedCurrency: React.FC<BaseProps & InjectedIntlProps> = ({
  value,
  currency,
  intl,
  sign,
}) => (
  <>{`${getPrefix(value, sign)}${intl.formatNumber(value, {
    currency,
    style: 'currency',
    currencyDisplay: 'code',
  })}`}</>
);

export const Currency: CurrencyComponent = injectIntl(FormattedCurrency);
Currency.displayName = 'Currency';
