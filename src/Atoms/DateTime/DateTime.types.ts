import { InjectedIntlProps } from 'react-intl';

export type Props = {
  value: number | string | null | undefined;
  onlyDate?: boolean;
  invalidValue?: string;
};

export type DateTimeComponent = React.FunctionComponent<Props & InjectedIntlProps>;
