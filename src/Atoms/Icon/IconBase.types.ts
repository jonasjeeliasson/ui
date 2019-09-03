import { Theme } from '../../theme/theme.types';

type ColorFn = (t: Theme) => Values<Theme['color']>;
type Values<ObjectType> = ObjectType extends Record<any, infer K> ? K : never; // can move it to util types

export type StyledIconBaseProps = {
  colorFn?: ColorFn;
  /** unit-based */
  size?: number;
  inline?: boolean;
};

export type StyledChildProps = {
  strokeColorFn?: ColorFn;
};

export type BaseProps = {
  className?: string;
  title?: string;
  viewBox?: string;
  /** @deprecated use fill instead */
  color?: ColorFn;
  fill?: ColorFn;
  /** unit-based */
  size?: number;
  inline?: boolean;
};

export type ChildProps = {
  stroke?: ColorFn;
} & BaseProps;

export type InternalProps = BaseProps & {
  children: React.ReactNode;
};
