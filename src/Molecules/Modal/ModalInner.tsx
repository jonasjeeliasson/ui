import React, { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { InnerProps, DialogProps } from './Modal.types';
import NormalizedElements from '../../common/NormalizedElements';
import { isFunction } from '../../common/utils';
import { Flexbox, Typography, Icon, Box, useKeyPress } from '../..';

const Backdrop = styled(Flexbox)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;

  ${({ theme }) => theme.media.greaterThan(theme.breakpoints.sm)} {
    background-color: ${({ theme }) => theme.color.modalBackdrop};
  }
`;

const Dialog = styled(motion.div)<DialogProps>`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit(5)}px;
  border: 0;
  background: ${({ theme }) => theme.color.card};

  ${({ theme }) => theme.media.lessThan(theme.breakpoints.sm)} {
    width: 100%;
    height: 100%;
    transform: none !important; /* disables the appear animation */
  }

  ${({ theme }) => theme.media.greaterThan(theme.breakpoints.sm)} {
    width: ${({ theme }) => theme.spacing.unit(120)}px;
    box-shadow: 0 2px 2px 0 ${({ theme }) => theme.color.shadowModal};
  }
`;

const Button = styled(NormalizedElements.Button)`
  display: flex;
  background: none;
  margin-left: ${p => p.theme.spacing.unit(4)}px;
  padding: 0;
  border: 0;
  cursor: pointer;
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
  const animationProps = {
    initial: {
      opacity: 0,
      y: 70,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
  };

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
          <Backdrop className={className} container alignItems="center" justifyContent="center">
            <Dialog
              role="dialog"
              show={show}
              {...(title ? { 'aria-label': title } : {})} // TODO: move to aria-labeledby when SSR uid works
              {...animationProps}
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
          </Backdrop>
        </RemoveScroll>
      </FocusLock>
    </>
  );
};

ModalInner.displayName = 'ModalInner';
