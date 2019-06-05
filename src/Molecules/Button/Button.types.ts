import React from 'react';
import { LinkProps as ReactRouterDomLinkProps } from 'react-router-dom';
import { Theme } from '../../theme/theme.types';

type Colors = Theme['color'];
type ColorFn = (t: Theme) => Colors['cta'] | Colors['negative'];
export type SharedProps = {
  /** @default primary */
  variant?: 'primary' | 'secondary';
  /** @default m */
  size?: 's' | 'm' | 'l';
  /** @default false */
  fullWidth?: boolean;
  children: React.ReactChild | React.ReactChild[];
  color?: ColorFn;
  className?: string;
};

export type ButtonProps = {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** @default button */
  type?: 'button' | 'reset' | 'submit';
  to?: ReactRouterDomLinkProps['to'];
  rel?: never;
  colorFn?: ColorFn;
} & SharedProps;

export type LinkProps = {
  onClick?: (e: React.MouseEvent) => void;
  to: ReactRouterDomLinkProps['to'];
  rel?: string;
  type?: never;
  disabled?: never;
  colorFn?: ColorFn;
} & SharedProps;

export type ButtonComponent = React.FC<ButtonProps | LinkProps>;
