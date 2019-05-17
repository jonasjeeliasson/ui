import React from 'react';
import { LinkProps as ReactRouterDomLinkProps } from 'react-router-dom';
import { Theme } from '../../theme/theme.types';

type Colors = Theme['color'];

export type SharedProps = {
  /** @default primary */
  variant?: 'primary' | 'secondary';
  /** @default m */
  size?: 's' | 'm' | 'l';
  /** @default false */
  fullWidth?: boolean;
  children: React.ReactChild | React.ReactChild[];
  color?: (t: Theme) => Colors['cta'] | Colors['negative'];
};

export type ButtonProps = {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** @default button */
  type?: 'button' | 'reset' | 'submit';
  to?: never;
  rel?: never;
} & SharedProps;

export type LinkProps = {
  onClick?: (e: React.MouseEvent) => void;
  to: ReactRouterDomLinkProps['to'];
  rel?: string;
  type?: never;
  disabled?: never;
} & SharedProps;

export type ButtonComponent = React.FC<ButtonProps | LinkProps>;
