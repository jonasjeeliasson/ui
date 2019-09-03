import React, { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';
import { InnerProps, DialogProps } from './Modal.types';
import NormalizedElements from '../../common/NormalizedElements';
import { isFunction } from '../../common/utils';
import { Flexbox, Typography, Icon, Box, useKeyPress } from '../..';

const Backdrop = styled.div`
  ${({ theme }) => theme.media.greaterThan(theme.breakpoints.sm)} {
    background-color: ${({ theme }) => theme.color.modalBackdrop};
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
`;

const Dialog = styled.div<DialogProps>`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit(5)}px;
  border: 0;
  background: ${({ theme }) => theme.color.card};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  ${({ theme }) => theme.media.lessThan(theme.breakpoints.sm)} {
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => theme.media.greaterThan(theme.breakpoints.sm)} {
    width: ${({ theme }) => theme.spacing.unit(120)}px;
    top: 50%;
    left: 50%;
    box-shadow: 0 2px 2px 0 ${({ theme }) => theme.color.shadowModal};
    transform: translate(-50%, 0%);
    opacity: 0;
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
    ${({ show }) =>
      show
        ? `
      transform: translate(-50%, -50%);
      opacity: 1;
    `
        : ''}
  }
`;

const Button = styled(NormalizedElements.Button)`
  background: none;
  margin-left: ${p => p.theme.spacing.unit(4)}px;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: flex;
`;

const RightAlignedFlex = styled(Flexbox)`
  margin-left: auto;
`;

const Content = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

export const ModalInner: React.FC<InnerProps> = ({ children, className, title, onClose }) => {
  const [show, setShow] = useState(false);
  const escapePress = useKeyPress('Escape');

  useEffect(() => {
    setShow(true); // Show is only used for animation

    return () => {
      setShow(false);
    };
  }, []);

  if (escapePress && isFunction(onClose)) {
    onClose();
  }

  return (
    <>
      <FocusLock>
        <RemoveScroll>
          <Dialog
            className={className}
            role="dialog"
            show={show}
            {...(title ? { 'aria-label': title } : {})} // TODO: move to aria-labeledby when SSR uid works
          >
            <Box mb={2}>
              <Flexbox container alignItems="baseline">
                {title && (
                  <Flexbox item>
                    <Typography as="h2" type="title2">
                      {title}
                    </Typography>
                  </Flexbox>
                )}
                <RightAlignedFlex item>
                  <Button type="button" onClick={onClose}>
                    <Icon.Cross size={5} title="Close this dialog" />
                  </Button>
                </RightAlignedFlex>
              </Flexbox>
            </Box>
            <Content>{children}</Content>
          </Dialog>
        </RemoveScroll>
      </FocusLock>
      <Backdrop />
    </>
  );
};

ModalInner.displayName = 'ModalInner';
