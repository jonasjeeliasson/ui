import React from 'react';
import { injectIntl } from 'react-intl';
import { NumberComponent as NumberComponentType, Ticks } from './Number.types';

const getPrefix = (sign: boolean, value: number) =>
  sign && value > 0 ? '+' : '';
  
const getTickDecimals = (value: number, ticks: Ticks) => {
  const tick = ticks.find(t => value >= t.fromPrice && value < t.toPrice + (t.tick || 0));

  return tick ? tick.decimals : undefined;
}

const getNumberOptions = (value: number, ticks?: Ticks, decimals?: number) => {
  if (typeof ticks !== 'undefined') {
    const tick = getTickDecimals(value, ticks);
    return {
      maximumFractionDigits: tick,
      minimumFractionDigits: tick,
    };
  }
  if (typeof decimals !== 'undefined') {
    return {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    };
  }

  return {};
}

const NumberComponent: NumberComponentType = ({
  intl,
  value,
  decimals,
  ticks,
  percentage = false,
  currency,
  sign = false,
}) => {
  if (typeof value === 'undefined' || value === null || !Number.isFinite(value)) return <>-</>;
  if (typeof currency !== 'undefined' && currency === null) return <>-</>;

  return (
    <>
      {getPrefix(sign, value)}
      {intl.formatNumber(value, getNumberOptions(value, ticks, decimals))}
      {percentage && '%'}
      {currency && ` ${currency}`}
    </>
  );
};

export default injectIntl(NumberComponent);
