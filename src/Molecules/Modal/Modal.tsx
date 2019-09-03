import React, { useState } from 'react';
import { Props } from './Modal.types';
import { isBoolean } from '../../common/utils';
import { ModalInner } from './ModalInner';
import { Portal } from '../..';

export const Modal: React.FC<Props> = ({
  open: isOpenExternal,
  onClose: onCloseExternal,
  ...rest
}) => {
  const isControlled = isBoolean(isOpenExternal);
  const [isOpenInternal, setIsOpenInternal] = useState(true);

  const onClose = () => {
    setIsOpenInternal(false);

    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const shouldRender = isControlled ? isOpenExternal : isOpenInternal;

  return shouldRender ? (
    <Portal>
      <ModalInner {...rest} onClose={onClose} />
    </Portal>
  ) : null;
};

Modal.displayName = 'Modal';
