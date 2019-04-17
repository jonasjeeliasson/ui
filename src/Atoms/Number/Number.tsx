import React from 'react';
import { injectIntl } from 'react-intl';
import { NumberComponent as NumberComponentType } from './Number.types';

const getNumberOptions = (decimals: number) => ({
  maximumFractionDigits: decimals,
  minimumFractionDigits: decimals,
});

const NumberComponent: NumberComponentType = ({ intl, value, decimals = 0, invalidValue = '-' }) =>
  value && Number.isFinite(value) ? (
    <>{intl.formatNumber(value, getNumberOptions(decimals))}</>
  ) : (
    <>{invalidValue}</>
  );

export default injectIntl(NumberComponent);
