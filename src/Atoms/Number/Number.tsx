import React from 'react';
import { injectIntl } from 'react-intl';
import * as R from 'ramda';
import { NumberComponent as NumberComponentType, Ticks } from './Number.types';
import { assert } from '../../common/utils';

const getPrefix = (sign: boolean, value: number) => (sign && value > 0 ? '+' : '');

const getTickDecimals = (value: number, ticks: Ticks) => {
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    const wrongTick = ticks.find(R.or(R.has('from_price'), R.has('to_price')));
    assert(!wrongTick, `Found ticks with snake cased keys, they should be camelcased.`);
  }
  const tick = ticks.find(t => value >= t.fromPrice && value < t.toPrice + (t.tick || 0));

  return tick ? tick.decimals : undefined;
};

type Options = {
  ticks?: Ticks;
  decimals?: number;
  minimumDecimals?: number;
  maximumDecimals?: number;
};

const getNumberOptions = (
  value: number,
  { ticks, decimals, maximumDecimals, minimumDecimals }: Options,
) => {
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
  if (typeof maximumDecimals !== 'undefined' || typeof minimumDecimals !== 'undefined') {
    return {
      maximumFractionDigits: maximumDecimals,
      minimumFractionDigits: minimumDecimals,
    };
  }

  return {};
};

const getDecimalsFromMinMax = (
  value: number,
  maximumDecimals: number = Number.MAX_VALUE,
  minimumDecimals: number = 0,
) => {
  const decimals = value.toString().split('.')[1].length || 0;
  if (decimals <= minimumDecimals) return minimumDecimals;
  if (decimals >= maximumDecimals) return maximumDecimals;
  return decimals;
};

export const getRoundedValue = (
  value: number,
  { ticks, decimals, maximumDecimals, minimumDecimals }: Options,
) => {
  let dec = null;
  if (typeof decimals !== 'undefined') dec = decimals;
  if (typeof ticks !== 'undefined') dec = getTickDecimals(value, ticks);
  if (typeof maximumDecimals !== 'undefined' || typeof minimumDecimals !== 'undefined')
    dec = getDecimalsFromMinMax(value, maximumDecimals, minimumDecimals);
  if (dec === null) return value;
  return dec === 0 ? Math.round(value) : +Number(value).toPrecision(dec);
};

const NumberComponent: NumberComponentType = ({
  intl,
  value,
  decimals,
  minimumDecimals,
  maximumDecimals,
  ticks,
  percentage = false,
  currency,
  sign = false,
}) => {
  if (typeof value === 'undefined' || value === null || !Number.isFinite(value)) return <>-</>;
  if (typeof currency !== 'undefined' && currency === null) return <>-</>;

  const roundedValue = getRoundedValue(value, {
    ticks,
    decimals,
    minimumDecimals,
    maximumDecimals,
  });
  const formattedNumber = intl.formatNumber(
    value,
    getNumberOptions(value, { ticks, decimals, minimumDecimals, maximumDecimals }),
  );
  return (
    <>
      {getPrefix(sign, roundedValue)}
      {formattedNumber !== '-0' ? formattedNumber : '0'}
      {percentage && '%'}
      {currency && ` ${currency}`}
    </>
  );
};

export default injectIntl(NumberComponent);
