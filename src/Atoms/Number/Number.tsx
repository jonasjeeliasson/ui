import React from 'react';
import { injectIntl } from 'react-intl';
import * as R from 'ramda'
import { NumberComponent as NumberComponentType, Ticks } from './Number.types';
import { assert } from '../../common/utils';

const getPrefix = (sign: boolean, value: number) => (sign && value > 0 ? '+' : '');

const getTickDecimals = (value: number, ticks: Ticks) => {
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    const wrongTick = ticks.find(R.or(R.has('from_price'), R.has('to_price')));
    assert(!wrongTick, `Found ticks with snake cased keys, they should be camelcased.`)
  }
  const tick = ticks.find(t => value >= t.fromPrice && value < t.toPrice + (t.tick || 0));

  return tick ? tick.decimals : undefined;
};

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
};

export const getRoundedValue = (value: number, ticks?: Ticks, decimals?: number) => {
  const dec = ticks ? getTickDecimals(value, ticks) : decimals;
  return dec === 0 ? 0 : +Number(value).toPrecision(dec);
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

  const roundedValue = getRoundedValue(value, ticks, decimals);
  return (
    <>
      {getPrefix(sign, roundedValue)}
      {intl.formatNumber(value, getNumberOptions(value, ticks, decimals))}
      {percentage && '%'}
      {currency && ` ${currency}`}
    </>
  );
};

export default injectIntl(NumberComponent);
