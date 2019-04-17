import { Props as CardProps } from '../../Atoms/Card/Card.types';

export type Props = {
  title?: React.ReactNode;
};

export type CardWithTitleComponent = React.FunctionComponent<CardProps & Props>;
