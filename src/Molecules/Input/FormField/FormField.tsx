import React from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import R from 'ramda';
import { Props } from './FormField.types';

import { VisuallyHidden, Flexbox, Typography } from '../../..';
import { visuallyHiddenCss as visuallyHidden } from '../../../Atoms/VisuallyHidden';

const hasError = (error?: Props['error']) => error && error !== '';

const LINE_HEIGHT_INFO_BELOW = 17;

const height = css<Pick<Props, 'size'>>`
  height: ${p => (p.size === 's' ? p.theme.spacing.unit(8) : p.theme.spacing.unit(10))}px;
`;

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

const outerFlexboxBorderColor = css<Pick<Props, 'error' | 'success'>>`
  border: 1px solid
    ${p => {
      if (hasError(p.error)) return p.theme.color.inputBorderError;
      if (p.success) return p.theme.color.inputBorderSuccess;
      return p.theme.color.inputBorder;
    }};
  ${focusBorderColor}
  ${hoverIfNotDisabled}
`;

const DensedTypography = styled(Typography)`
  line-height: ${LINE_HEIGHT_INFO_BELOW}px;
  display: inline-block;
`;

const InlineFlexbox = styled(Flexbox)`
  display: flex;
  width: 100%;
`;

const BottomWrapper = styled(motion.span)`
  width: 100%;
`;

const CleanFlexbox = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => (
  <Flexbox {...R.omit(['error', 'disabled', 'innerWrapperRef'], props)} ref={ref} />
));

const InnerWrapperFlexbox = styled(CleanFlexbox)`
  position: relative;
  ${height}
  box-sizing: border-box;

  ${outerFlexboxBorderColor}

  background-color: #ffffff;
  box-shadow: 0 1px 3px ${p => p.theme.color.shadowInput};
  font: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
`;

const HidableTypography = styled(Typography)<{ hidden: boolean }>`
  ${p => (p.hidden ? visuallyHidden : '')}
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FormField: React.FC<Props> = ({
  children,
  className,
  width,
  label,
  hideLabel,
  size,
  error,
  success,
  disabled,
  extraInfo,
  onClick,
  innerWrapperRef,
}) => (
  /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
  <Wrapper width={width} className={className} onClick={onClick}>
    <label>
      <InlineFlexbox container direction="column">
        <HidableTypography hidden={Boolean(hideLabel)} type="secondary" color={t => t.color.label}>
          {label}
        </HidableTypography>
        <Flexbox item alignSelf="stretch">
          <Typography type="secondary" color={t => t.color.text} as="div">
            <InnerWrapperFlexbox
              ref={innerWrapperRef}
              container
              alignItems="center"
              {...{ size, error, success, disabled }}
            >
              {children}
            </InnerWrapperFlexbox>
          </Typography>
        </Flexbox>
      </InlineFlexbox>
    </label>
    <AnimatePresence>
      {hasError(error) ? (
        <BottomWrapper
          size={size}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          aria-live="polite"
          // TODO: Check this one @manman
          // @ts-ignore
          aria-relevant="additions removals"
        >
          <DensedTypography type="tertiary" color={t => t.color.negative}>
            <VisuallyHidden>Error: </VisuallyHidden>
            {error}
          </DensedTypography>
        </BottomWrapper>
      ) : (
        extraInfo && (
          <BottomWrapper
            size={size}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            aria-live="polite"
            // TODO: Check this one @manman
            // @ts-ignore
            aria-relevant="additions removals"
          >
            <DensedTypography type="tertiary" color={t => t.color.label}>
              {extraInfo}
            </DensedTypography>
          </BottomWrapper>
        )
      )}
    </AnimatePresence>
  </Wrapper>
);
