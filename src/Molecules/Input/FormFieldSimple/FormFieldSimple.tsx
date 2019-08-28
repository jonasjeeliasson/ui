import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Props } from './FormFieldSimple.types';

import { VisuallyHidden, FormLabel, Typography, Flexbox } from '../../..';

const hasError = (error?: Props['error']) => error && error !== '';

const Wrapper = styled.div<{ width?: string | number }>`
  ${p => (p.width ? `width: ${p.width};` : 'width: 200px;')}
  display: inline-block;
`;

const InnerWrapper = styled(Flexbox)`
  position: relative;
  background-color: #ffffff;
  height: ${p => (p.size === 's' ? p.theme.spacing.unit(8) : p.theme.spacing.unit(10))}px;
  box-shadow: 0 1px 3px ${p => p.theme.color.shadowInput};
  box-sizing: border-box;
`;

const BottomWrapper = styled(motion.div)``;

export const FormFieldSimple: React.FC<Props> = ({
  children,
  className,
  width,
  label,
  hideLabel,
  fieldId,
  size,
  error,
  extraInfo,
}) => (
  <Wrapper width={width} className={className}>
    <FormLabel hideLabel={hideLabel} forId={fieldId}>
      {label}
    </FormLabel>
    <Typography type="secondary" color={t => t.color.text}>
      <InnerWrapper container {...{ size }}>
        {children}
      </InnerWrapper>
    </Typography>
    <AnimatePresence>
      {hasError(error) ? (
        <BottomWrapper
          size={size}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          aria-live="assertive"
          // @ts-ignore
          aria-relevant="additions removals"
        >
          <Typography type="tertiary" color={t => t.color.negative}>
            <VisuallyHidden>Error: </VisuallyHidden>
            {error}
          </Typography>
        </BottomWrapper>
      ) : (
        extraInfo && (
          <BottomWrapper
            size={size}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            aria-live="polite"
            // @ts-ignore
            aria-relevant="additions removals"
          >
            <Typography type="tertiary" color={t => t.color.label}>
              {extraInfo}
            </Typography>
          </BottomWrapper>
        )
      )}
    </AnimatePresence>
  </Wrapper>
);
