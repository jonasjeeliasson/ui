export const assert = (expression: boolean, errorMessage: string): true => {
  if (process.env.NODE_ENV !== 'production') {
    if (!expression) {
      throw new Error(errorMessage);
    }
  }
  // For chaining with &&
  return true;
};

export const isUndefined = (x: any): x is undefined => typeof x === 'undefined';
