import React from 'react';
import { Theme } from '../../theme/theme.types';

type Values<ObjectType> = ObjectType extends Record<any, infer K> ? K : never; // can move it to util types
type ColorFn = (t: Theme) => Values<Theme['color']>;

export type Props = {
  vertical?: Boolean;
  color?: ColorFn;
};

export type StyledProps = {
  vertical?: Boolean;
  colorFunction?: ColorFn;
};

export type SeparatorComponent = React.FC<Props>;
