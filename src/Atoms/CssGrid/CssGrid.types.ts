export type Areas = AreasRow[];
type AreasRow = AreaName[];
export type AreaInfo = {
  id: number;
  rowStart: number;
  rowSpan: number;
  colStart: number;
  colSpan: number;
};
export type AreaName = string;
export type Gutter = number | { row: number; col: number };
export type TemplateColumn = string[] | number[];
export type TemplateRow = string[];
type BaseProps = {
  children: React.ReactNode;
  height?: string;

  /** 
   * @example const x:Areas = [
          ['header', 'header', 'header'],
          ['left', 'content', 'side'],
          ['left', 'header', 'header'],
      ]
    @example const x:Areas = {
      xs: [
        ['header', 'header', 'header'],
        ['left', 'content', 'side'],
        ['left', 'header', 'header'],
      ],
      md: [
        ['header', 'header'],
        ['left', 'side'],
        ['content', 'content'],
      ]
    }
        
      */
  areas: Areas;
  templateRows?: string[];
  gutter?: Gutter;
  /**
   * templateColumns can be used in two ways.
   * If you provide a array of strings then that would be treated as a CSS units
   * If you provide a array of numbers then that would be treated as number of columns
   * @example `templateColumns={['1fr', '2fr', '1fr']}`
   * @example `templateColumns={[3, 6, 3]}`
   */
  templateColumns?: TemplateColumn;
};
export type Props = SizeAwareProps<BaseProps>;
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type PartialWithoutChildren<P> = Partial<Omit<P, 'children'>>;
type SizeAwareProps<P> = P & {
  sm?: PartialWithoutChildren<P>;
  md?: PartialWithoutChildren<P>;
  lg?: PartialWithoutChildren<P>;
  xl?: PartialWithoutChildren<P>;
};
