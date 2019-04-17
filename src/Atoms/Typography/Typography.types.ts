import React from 'react';
import { Theme } from '../../theme/theme.types';

type Values<ObjectType> = ObjectType extends Record<any, infer K> ? K : never; // can move it to util types
type ColorFn = (t: Theme) => Values<Theme['color']>;

export type Types =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'caption'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'hero';

// TODO: for a better day
// type PrimaryProps = {
//   /** @default 'regular' */
//   type?: 'primary';
//   weight?: 'regular' | 'bold' | 'extrabold';
// };
// type SecondaryProps = {
//   /** @default 'regular' */
//   type: 'secondary';
//   weight?: 'regular' | 'bold';
// };
// type TertiaryProps = {
//   /** @default 'regular' */
//   type: 'tertiary';
//   weight?: 'regular' | 'bold';
// };
// type CaptionProps = {
//   /** @default 'regular' */
//   type: 'caption';
//   weight?: 'regular' | 'bold';
// };
// type TitleProps = {
//   /** @default 'extrabold' */
//   type: 'title1' | 'title2' | 'title3';
//   weight?: 'regular' | 'bold' | 'extrabold';
// };
// type HeroProps = {
//   /** @default 'extrabold' */
//   type: 'hero';
//   weight?: 'bold' | 'extrabold';
// };

export type Props = {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  color?: 'inherit' | ColorFn;
  weight?: string;
  type?: string;
  /**
   * primary has font-weight: regular, font-size: 14px (mobile) and 16px (desktop)
   * secondary has font-weight: regular, font-size: 12px (mobile) and 14px (desktop)
   * tertiary has font-weight: regular, font-size: 10px (mobile) and 12px (desktop)
   * title1 has font-weight: extrabold, font-size: 30px (mobile) and 32px (desktop)
   * title3 has font-weight: extrabold, font-size: 18px (mobile) and 20px (desktop)
   */
  children: React.ReactNode;
};
