type UseKeyboardNavigationArgs = { itemsLength: number; onChange?: (n: number) => void };

export const useKeyboardNavigation = ({
  itemsLength,
  onChange = (_: number) => null,
}: UseKeyboardNavigationArgs) => {
  const tabRefs: HTMLElement[] = [];

  const getActive = () => Object.values(tabRefs).findIndex(tab => tab === document.activeElement);

  const onKeyDown = (e: React.KeyboardEvent): void => {
    const active = getActive();
    // keyCode is deprecated so default to e.key
    const left = (e.key && e.key === 'ArrowLeft') || e.keyCode === 37;
    const right = (e.key && e.key === 'ArrowRight') || e.keyCode === 39;
    if (left) {
      if (active === 0) {
        return;
      }
      const newSelected = active - 1;
      if (tabRefs[newSelected]) tabRefs[newSelected]!.focus();
      onChange(newSelected);
      return;
    }
    if (right) {
      if (active === itemsLength - 1) {
        return;
      }
      const newSelected = active + 1;
      if (tabRefs[newSelected]) tabRefs[newSelected].focus();
      onChange(newSelected);
    }
  };

  const setRef = (index: number) => <RefType extends HTMLElement>(ref: RefType | null) => {
    if (ref) tabRefs[index] = ref;
  };

  return { setRef, onKeyDown };
};
