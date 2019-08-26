const isNumeric = (n: any) => Number.isFinite(n);

export const getNumberAsString = (value?: any) => {
  if (isNumeric(value)) {
    return value.toString();
  }
  if (typeof value === 'string' && isNumeric(Number.parseFloat(value))) {
    return value;
  }

  return '';
};

export const getStringAsNumber = (value: any = '') => {
  const valueStr = getNumberAsString(value);
  return Number(valueStr.replace(',', '.'));
};
