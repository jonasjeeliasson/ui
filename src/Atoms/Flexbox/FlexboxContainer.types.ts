export type Props = {
  children: React.ReactNode;
  height?: number;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  twoDimension?: false | undefined | null;
  /** flexbox direction */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gutter?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'self-start'
    | 'self-end';
  alignContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'normal'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';

  /** a11y */
  role?: string;
};
