import { Props as CardProps } from '../../Atoms/Card/Card.types';

export type Props = {
  title: React.ReactNode;
} & CardProps;

export type CardWithTitleComponent = React.FunctionComponent<Props>;
