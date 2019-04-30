import { InjectedIntlProps } from 'react-intl';

export type Ticks = { fromPrice: number; toPrice: number; tick?: number; decimals: number }[];

export type Props = {
  value: number | null | undefined;
  decimals?: number;
  ticks?: Ticks;
  percentage?: boolean;
  currency?: string;
  /**
   * show a plus sign if positive
   * @default false
   * */
  sign?: boolean;
};

export type NumberComponent = React.FunctionComponent<Props & InjectedIntlProps>;
