import { InjectedIntlProps } from 'react-intl';

export type Props = {
  decimals?: number;
  value: number | null | undefined;
  invalidValue?: number | string;
};

export type NumberComponent = React.FunctionComponent<Props & InjectedIntlProps>;
