import { getNumberAsString, getStringAsNumber } from './utils';

describe('getNumberAsString', () => {
  test('int to string', () => {
    const result = getNumberAsString(10);
    expect(result).toEqual('10');
  });

  test('float to string', () => {
    const result = getNumberAsString(10.25);
    expect(result).toEqual('10.25');
  });

  test('string to string', () => {
    const result = getNumberAsString('10.25');
    expect(result).toEqual('10.25');
  });

  test('string to string, preserve decimal seperator', () => {
    const result = getNumberAsString('10,25');
    expect(result).toEqual('10,25');
  });

  test('empty', () => {
    const result = getNumberAsString('');
    expect(result).toEqual('');
  });

  test('not a number', () => {
    const result = getNumberAsString(false);
    expect(result).toEqual('');
  });
});

describe('getStringAsNumber', () => {
  test('string to int', () => {
    const result = getStringAsNumber('10');
    expect(result).toEqual(10);
  });

  test('string to float', () => {
    const result = getStringAsNumber('10.25');
    expect(result).toEqual(10.25);
  });

  test('int to int', () => {
    const result = getStringAsNumber(10);
    expect(result).toEqual(10);
  });

  test('float to float', () => {
    const result = getStringAsNumber(10.25);
    expect(result).toEqual(10.25);
  });

  test('empty string', () => {
    const result = getStringAsNumber('');
    expect(result).toEqual(0);
  });

  test('not a number', () => {
    const result = getStringAsNumber(false);
    expect(result).toEqual(0);
  });
});
