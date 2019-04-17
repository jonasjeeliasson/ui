import { injectIntl } from 'react-intl';
import React from 'react';
import R from 'ramda';
import { TimeComponent } from './Time.types';

const convertToDate = (value: number) => new Date(value);
const isInvalid = R.anyPass([
  R.isNil,
  R.pipe(
    convertToDate,
    R.toString,
    R.equals('Invalid Date'),
  ),
]);

const isValid= R.complement(isInvalid) as (x:any) => x is number;

const timeOptions = {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const Time: TimeComponent = ({ intl, value, invalidValue = '-' }) =>
  isValid(value) ? <>{intl.formatTime(value, timeOptions)}</> : <>{invalidValue}</>;

export default injectIntl(Time);
