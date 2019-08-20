import React from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Props } from './FormField.types';

import { VisuallyHidden, FormLabel, Typography } from '../../..';

const hasError = (error?: Props['error']) => error && error !== '';

const Wrapper = styled.div<{ width?: string | number }>`
  ${p => (p.width ? `width: ${p.width};` : 'width: 200px;')}
  display: inline-block;
`;

const hoverIfNotDisabled = css<Pick<Props, 'disabled'>>`
  ${p =>
    p.disabled
      ? ''
      : `
      &:hover:not(:focus-within) {
        border-color: ${p.theme.color.inputBorderHover};
      }
`}
`;

const focusBorderColor = css<Pick<Props, 'error'>>`
  &:focus-within {
    border-color: ${p =>
      hasError(p.error) ? p.theme.color.inputBorderError : p.theme.color.borderActive};
  }
  &.focus-within {
    border-color: ${p =>
      hasError(p.error) ? p.theme.color.inputBorderError : p.theme.color.borderActive};
  }
`;

const borderStyles = css<Pick<Props, 'error' | 'success'>>`
  border: 1px solid
    ${p => {
      if (hasError(p.error)) return p.theme.color.inputBorderError;
      if (p.success) return p.theme.color.inputBorderSuccess;
      return p.theme.color.inputBorder;
    }};
  ${focusBorderColor}
  ${hoverIfNotDisabled}
`;

const InnerWrapper = styled.div<Pick<Props, 'size'>>`
  position: relative;
  background-color: #ffffff;
  height: ${p => (p.size === 's' ? p.theme.spacing.unit(8) : p.theme.spacing.unit(10))}px;
  ${borderStyles}
  box-sizing: border-box;
  box-shadow: 0 1px 3px ${p => p.theme.color.shadowInput};
`;

export const FormField: React.FC<Props> = ({
  children,
  className,
  width,
  label,
  hideLabel,
  itemId,
  size,
  error,
  success,
  disabled,
  extraInfo,
  onClick,
}) => (
  /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
  <Wrapper width={width} className={className} onClick={onClick}>
    <FormLabel hideLabel={hideLabel} forId={itemId}>
      {label}
    </FormLabel>
    <InnerWrapper {...{ size, error, success, disabled }}>
      <Typography type="secondary" color={t => t.color.text}>
        {children}
      </Typography>
    </InnerWrapper>
    <AnimatePresence>
      {hasError(error) ? (
        <motion.div
          size={size}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          aria-live="polite"
          // TODO: Check this one @manman
          // @ts-ignore
          aria-relevant="additions removals"
        >
          <Typography type="tertiary" color={t => t.color.negative}>
            <VisuallyHidden>Error: </VisuallyHidden>
            {error}
          </Typography>
        </motion.div>
      ) : (
        extraInfo && (
          <motion.div
            size={size}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            aria-live="polite"
            // TODO: Check this one @manman
            // @ts-ignore
            aria-relevant="additions removals"
          >
            <Typography type="tertiary" color={t => t.color.label}>
              {extraInfo}
            </Typography>
          </motion.div>
        )
      )}
    </AnimatePresence>
  </Wrapper>
);
