import { InjectedIntlProps } from 'react-intl';

export type Props = {
  value: number | null | undefined;
  invalidValue?: string;
};

export type TimeComponent = React.FunctionComponent<Props & InjectedIntlProps>;
