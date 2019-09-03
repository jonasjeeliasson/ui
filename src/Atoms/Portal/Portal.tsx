import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useSSR from 'use-ssr';
import { isHTMLElement, isUndefined } from '../../common/utils';
import { Props } from './Portal.types';

export const Portal: React.FC<Props> = ({ children, attachTo }) => {
  const { isBrowser, isServer } = useSSR();
  const portal = useRef(isBrowser && document.createElement('div'));

  useEffect(() => {
    const elToMountTo = isUndefined(attachTo) ? document.body : attachTo;
    const portalNode = portal.current;

    if (isServer || !isHTMLElement(elToMountTo) || !isHTMLElement(portalNode)) {
      return;
    }

    elToMountTo.appendChild(portalNode);

    // eslint-disable-next-line consistent-return
    return function cleanup() {
      elToMountTo.removeChild(portalNode);
    };
  }, [attachTo, isServer]);

  return isHTMLElement(portal.current) ? createPortal(children, portal.current) : null;
};
