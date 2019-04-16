export type Props = {
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: string;
  flex?: string;
  align?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  size?: number | string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** a11y */
  role?: string;
};

export type PropsWithGutter = {
  gutter?: number;
} & Props;
