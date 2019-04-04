import React from 'react';
import PropTypes from 'prop-types';


// type Arguments = { itemsLength: number; onChange?: (index: number) => void };
// const Return = { setRef: (index: number) => ((r: any) => void);  };

const useKeyboardNavigation = ({ itemsLength, onChange = (n: number) => null }) => {
// const useKeyboardNavigation: Arguments => Return = ({ itemsLength, onChange }) => {
  const tabRefs = [];

  const getActive = () =>
    Object.values(tabRefs).findIndex(tab => tab === document.activeElement);

  const onKeyDown = e => {
    const active = getActive();
    // keyCode is deprecated so default to e.key
    const left = (e.key && e.key === 'ArrowLeft') || e.keyCode === 37;
    const right = (e.key && e.key === 'ArrowRight') || e.keyCode === 39;
    if (left) {
      if (active === 0) {
        return null;
      }
      const newSelected = active - 1;
      if (tabRefs[newSelected]) tabRefs[newSelected].focus();
      onChange(newSelected);
    } else if (right) {
      if (active === itemsLength - 1) {
        return null;
      }
      const newSelected = active + 1;
      if (tabRefs[newSelected]) tabRefs[newSelected].focus();
      onChange(newSelected);
    }
  };

  const setRef = index => ref => {
    tabRefs[index] = ref;
  };

  return { setRef, onKeyDown }
}


export {useKeyboardNavigation};
